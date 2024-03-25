import { prisma } from "@/lib/prisma";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
