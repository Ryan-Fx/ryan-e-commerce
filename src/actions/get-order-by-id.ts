import { prisma } from "@/lib/prisma";

export async function getOrderById(userId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        userId: userId,
      },
    });

    console.log(order);
    return order;
  } catch (error: any) {
    throw new Error(error);
  }
}
