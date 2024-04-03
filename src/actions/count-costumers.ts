import { prisma } from "@/lib/prisma";

export async function countCostumers() {
  try {
    const count = await prisma.user.count();

    return count;
  } catch (error: any) {
    throw new Error(error);
  }
}
