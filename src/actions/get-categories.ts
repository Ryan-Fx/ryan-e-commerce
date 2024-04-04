import { prisma } from "@/lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return categories;
  } catch (error: any) {
    throw new Error(error);
  }
}
