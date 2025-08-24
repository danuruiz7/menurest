"use server";

import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/restaurant/generateSlug";
import fs from "fs";
import { revalidatePath } from "next/cache";
import path from "path";

export type RestaurantFormData = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  website: string;
  userId: number;
  logoUrl?: string;
};

/**
 * Crea un nuevo restaurante en la base de datos
 */
export async function createRestaurantInfo(data: RestaurantFormData, file: File | null) {
  console.log("Creando restaurante:", data);
  const slug = generateSlug(data.name);


  try {
    // Usar transacción para garantizar que ambas operaciones se completen o ninguna
    const { restaurant } = await prisma.$transaction(async (tx) => {
      // Crear nuevo restaurante
      const restaurant = await tx.restaurantInfo.create({
        data: {
          name: data.name,
          address: data.address,
          phone: data.phone,
          email: data.email,
          description: data.description,
          website: data.website,
          slug: slug,
        },
      });

      // Actualizar el usuario con el ID del restaurante
      if (data.userId) {
        await tx.user.update({
          where: { id: data.userId },
          data: {
            restaurantId: restaurant.id,
          },
        });
      }

      return { restaurant };
    });

    // Subir el logo si existe
    if (file && restaurant) {
      const logoUrl = await uploadRestaurantLogo(restaurant.id, restaurant.name, file);

      // Actualizar el restaurante con la URL del logo
      await prisma.restaurantInfo.update({
        where: { id: restaurant.id },
        data: { logoUrl },
      });

      // Actualizar el objeto restaurant con la URL
      restaurant.logoUrl = logoUrl;
    }
    revalidatePath("/dashboard");
    return {
      success: true,
      restaurant,
    };

  } catch (error) {
    console.error("Error al crear restaurante:", error);
    return {
      success: false,
      error: "Error al crear la información del restaurante",
    };
  }
}



/**
 * Actualiza un restaurante existente en la base de datos
 */
export async function updateRestaurantInfo(data: RestaurantFormData, file: File | null) {
  console.log("Actualizando restaurante:", data);

  try {
    // Actualizar restaurante existente
    const restaurant = await prisma.restaurantInfo.update({
      where: { id: data.id },
      data: {
        address: data.address,
        phone: data.phone,
        email: data.email,
        description: data.description,
        website: data.website,
        logoUrl: data.logoUrl,
      },
    });

    // Subir el logo si existe
    if (file && restaurant) {
      const logoUrl = await uploadRestaurantLogo(restaurant.id, restaurant.name, file);

      // Actualizar el restaurante con la URL del logo
      await prisma.restaurantInfo.update({
        where: { id: restaurant.id },
        data: { logoUrl },
      });

      // Actualizar el objeto restaurant con la URL
      restaurant.logoUrl = logoUrl;
    }
    revalidatePath("/dashboard");
    return {
      success: true,
      restaurant,
    };
  } catch (error) {
    console.error("Error al actualizar restaurante:", error);
    return {
      success: false,
      error: "Error al actualizar la información del restaurante",
    };
  }
}



async function uploadRestaurantLogo(
  restaurantId: number,
  restaurantName: string,
  file: File
): Promise<string> {
  // Crear un nombre de archivo único
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const sanitizedName = restaurantName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const fileExtension = file.name.split('.').pop() || 'jpg';
  const filename = `logo_${sanitizedName}.${fileExtension}`;

  // Crear carpeta en /public/uploads/restaurants/{id-nombre}
  const baseDir = path.join(process.cwd(), "public", "uploads", "restaurants");
  const restaurantDir = path.join(baseDir, `${restaurantId}_${sanitizedName}`);

  // Verificar si existe la carpeta base de uploads/restaurants
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  // Verificar si existe la carpeta específica del restaurante
  if (!fs.existsSync(restaurantDir)) {
    fs.mkdirSync(restaurantDir);
  } else {
    // Si la carpeta existe, buscar y eliminar logos anteriores
    try {
      const files = fs.readdirSync(restaurantDir);
      // Eliminar solo los archivos que comienzan con "logo_"
      for (const oldFile of files) {
        if (oldFile.startsWith('logo_')) {
          const oldFilePath = path.join(restaurantDir, oldFile);
          fs.unlinkSync(oldFilePath);
          console.log(`Logo anterior eliminado: ${oldFilePath}`);
        }
      }
    } catch (error) {
      console.error("Error al eliminar logos anteriores:", error);
    }
  }

  // Guardar el archivo
  const filePath = path.join(restaurantDir, filename);
  fs.writeFileSync(filePath, buffer);

  // Devolver la URL del logo
  return `/uploads/restaurants/${restaurantId}_${sanitizedName}/${filename}`;
}