import { prisma } from "@/lib/prisma";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 6,
      include: {
        category: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
