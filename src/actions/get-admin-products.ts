import { prisma } from "@/lib/prisma";

export async function getAdminProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 6,
      orderBy: {
        id: "desc",
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
