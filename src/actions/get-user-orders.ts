import { prisma } from "@/lib/prisma";

export async function getUserOrders(userId: string) {
  try {
    const userOrders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        id: "desc",
      },
    });

    return userOrders;
  } catch (error: any) {
    throw new Error(error);
  }
}
