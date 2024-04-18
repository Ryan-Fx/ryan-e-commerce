import { prisma } from "@/lib/prisma";

export async function getOrdersPagination(
  currentPage: number,
  perPage: number
) {
  const ITEMS_PER_PAGE = perPage;
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

export async function getOrderPagesPagination(perPage: number) {
  const ITEMS_PER_PAGE = perPage;

  try {
    const orders = await prisma.order.count();

    const totalPages = Math.ceil(orders / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error: any) {
    throw new Error(error);
  }
}
