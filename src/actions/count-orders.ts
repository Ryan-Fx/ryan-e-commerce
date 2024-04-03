import { prisma } from "@/lib/prisma";

export async function countOrders() {
  try {
    const count = await prisma.order.count();

    return count;
  } catch (error: any) {
    throw new Error(error);
  }
}
