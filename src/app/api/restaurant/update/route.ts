import { NextResponse } from "next/server";
import { dataMapeoRestaurant } from "@/lib/restaurant/dataMapeo";
import { updateRestaurantInfo } from "@/actions/restaurant/crudRestaurantInfo";


export async function POST(request: Request) {
  try {
    // Procesar el FormData
    const formData = await request.formData();
    const { restaurantWithoutLogo, logoFile } = dataMapeoRestaurant(formData);

    const { success, restaurant, error } = await updateRestaurantInfo(restaurantWithoutLogo, logoFile);

    if (!success) {
      return NextResponse.json(
        { success: false, message: error || "Error updating restaurant" },
        { status: 500 }
      );
    }

    // Si no hay cookie o hubo un error, devolvemos la respuesta normal
    return NextResponse.json({
      success: true,
      message: "Restaurant updated successfully",
      data: restaurant
    });

  } catch (error) {
    console.error("Error processing restaurant update:", error);
    return NextResponse.json(
      { success: false, message: "Error updating restaurant" },
      { status: 500 }
    );
  }
}