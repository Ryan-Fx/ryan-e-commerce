import { prisma } from "@/lib/prisma";

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        address: true,
      },
    });

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}
