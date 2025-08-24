"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRestaurantBySlug = async (slug: string) => {
  try {
    const restaurant = await prisma.restaurantInfo.findUnique({
      where: {
        slug: slug
      }
    });

    if (!restaurant) {
      return null;
    }

    return restaurant;
  } catch (error) {
    console.error(error);
    return null;
  }
};
