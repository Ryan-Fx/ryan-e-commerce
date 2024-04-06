import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 2;

// for search bar
export async function getProductsPagination(currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE; // for skip

  try {
    const products = await prisma.product.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: {
        id: "desc",
      },
      include: {
        category: true,
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

// get total pages
export async function getProductPagesPagination(query: string) {
  try {
    const products = await prisma.product.count();

    const totalPages = Math.ceil(Number(products) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error: any) {
    throw new Error(error);
  }
}
