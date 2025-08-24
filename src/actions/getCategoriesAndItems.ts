"use server";

import prisma from "@/lib/prisma";

export async function getCategoriesAndItems(restaurantId: number) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        items: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            imageUrl: true,
            isActive: true,
            restaurantId: true,
          },
          where: {
            restaurantId: restaurantId,
          },
        },
      },

    });
    const categoriesOrdered = categories.sort(
      (a, b) => a.menuPosition - b.menuPosition
    );
    return categoriesOrdered ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
