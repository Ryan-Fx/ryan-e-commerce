import { prisma } from "@/lib/prisma";

export async function countProducts() {
  try {
    const count = await prisma.product.count();

    return count;
  } catch (error: any) {
    throw new Error(error);
  }
}
