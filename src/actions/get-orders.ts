import { prisma } from "@/lib/prisma";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
