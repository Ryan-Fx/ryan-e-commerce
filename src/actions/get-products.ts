import { prisma } from "@/lib/prisma";

export async function getProducts(query: string) {
  try {
    const products = await prisma.product.findMany({
      take: 6,
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
