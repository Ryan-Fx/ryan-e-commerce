import { prisma } from "@/lib/prisma";

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      orderBy: {
        id: "desc",
      },
    });

    return customers;
  } catch (error: any) {
    throw new Error(error);
  }
}
