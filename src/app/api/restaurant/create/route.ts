import { NextResponse } from "next/server";
import { dataMapeoRestaurant } from "@/lib/restaurant/dataMapeo";
import { createRestaurantInfo } from "@/actions/restaurant/crudRestaurantInfo";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

export async function POST(request: Request) {
  try {
    // Procesar el FormData
    const formData = await request.formData();
    const { restaurantWithoutLogo, logoFile } = dataMapeoRestaurant(formData);

    const { success, restaurant, error } = await createRestaurantInfo(restaurantWithoutLogo, logoFile);


    if (!success) {
      return NextResponse.json(
        { success: false, message: error || "Error creating restaurant" },
        { status: 500 }
      );
    }

    // Actualizar la cookie del token con el nuevo restaurantId
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");

    if (tokenCookie && restaurant) {
      try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
          throw new Error('JWT_SECRET no está definida en el .env');
        }

        // Verificar y decodificar el token actual
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(tokenCookie.value, secret);

        // Actualizar el restaurantId en el payload
        const updatedPayload = {
          ...payload,
          restaurantId: restaurant.id
        };

        // Crear un nuevo token con el payload actualizado
        const newToken = await new SignJWT(updatedPayload)
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('1h')
          .setIssuedAt()
          .sign(secret);

        // Crear la respuesta con la cookie actualizada
        const response = NextResponse.json({
          success: true,
          message: "Restaurant created successfully",
          data: restaurant
        });

        // Establecer la cookie actualizada
        response.cookies.set('token', newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60, // 1 hora
        });

        return response;
      } catch (tokenError) {
        console.error("Error updating token:", tokenError);
        // Si hay un error al actualizar el token, continuamos sin actualizar la cookie
      }
    }

    // Si no hay cookie o hubo un error, devolvemos la respuesta normal
    return NextResponse.json({
      success: true,
      message: "Restaurant created successfully",
      data: restaurant
    });

  } catch (error) {
    console.error("Error processing restaurant creation:", error);
    return NextResponse.json(
      { success: false, message: "Error creating restaurant" },
      { status: 500 }
    );
  }
}