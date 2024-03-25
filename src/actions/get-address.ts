import { prisma } from "@/lib/prisma";

export async function getAddress() {
  try {
    const address = await prisma.address.findMany();

    return address;
  } catch (error: any) {
    throw new Error(error);
  }
}
