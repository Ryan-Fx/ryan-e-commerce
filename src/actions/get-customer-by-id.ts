import { prisma } from "@/lib/prisma";

export async function getCustomerById(customerId: string) {
  try {
    const customer = await prisma.user.findUnique({
      where: {
        id: customerId,
      },
      include: {
        orders: true,
      },
    });

    return customer;
  } catch (error: any) {
    throw new Error(error);
  }
}
