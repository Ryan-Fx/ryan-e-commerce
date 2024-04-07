import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 2;

export async function getOrders(currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const orders = await prisma.order.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: {
        id: "desc",
      },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getOrdersTotalPage() {
  try {
    const orders = await prisma.order.count();

    const totalPages = Math.ceil(orders) / ITEMS_PER_PAGE;
    return totalPages;
  } catch (error: any) {
    throw new Error(error);
  }
}
