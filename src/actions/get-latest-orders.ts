import { prisma } from "@/lib/prisma";

export async function getLatestOrders() {
  try {
    const latestOrders = await prisma.order.findMany({
      take: 5,
      select: {
        id: true,
        amount: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return latestOrders;
  } catch (error: any) {
    throw new Error(error);
  }
}
