import { prisma } from "@/lib/prisma";

export async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
      },
    });

    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
