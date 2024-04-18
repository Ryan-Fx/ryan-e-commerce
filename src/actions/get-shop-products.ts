import { prisma } from "@/lib/prisma";

export async function getShopProducts(query: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
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
