import { prisma } from "@/lib/prisma";

export async function getAddressById(userId: string) {
  try {
    const address = await prisma.address.findUnique({
      where: {
        userId: userId,
      },
    });

    console.log(address);
    return address;
  } catch (error: any) {
    throw new Error(error);
  }
}
