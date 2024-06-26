import { prisma } from "@/lib/prisma";

export async function getOrderById(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });

    console.log(order);
    return order;
  } catch (error: any) {
    throw new Error(error);
  }
}
