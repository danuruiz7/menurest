"use server";

import { Restaurant } from "@/types/resturant";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRestaurant = async (restaurantId?: number) => {
  try {
    // Si no hay restaurantId, buscar el primer restaurante o devolver null
    if (restaurantId === undefined || restaurantId === -1) {
      return {
        id: 1,
        name: 'Restaurante Default',
        logoUrl: '/logo.jpeg',
        address: '123 Calle Falsa',
        phone: '+123456789',
        email: 'info@Default.com',
        description: '',
        website: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }

    // Si hay restaurantId, buscar por ID
    const restaurant = await prisma.restaurantInfo.findUnique({
      where: {
        id: restaurantId
      }
    });
    return restaurant;
  } catch (error) {
    console.error(error);
    return null;
  }
};
