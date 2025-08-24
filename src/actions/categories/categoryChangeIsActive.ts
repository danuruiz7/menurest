"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function categoryChangeIsActive(
  itemId: number,
  isActive: boolean
) {
  try {
    await prisma.category.update({
      where: {
        id: itemId,
      },
      data: {
        isActive: !isActive,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/menu");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
