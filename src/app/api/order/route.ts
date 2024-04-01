import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const body = await req.json();
    const { amount, items } = body;

    const order = await prisma.order.create({
      data: {
        ...body,
        userId,
        amount,
        items,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return new NextResponse("internal Server Error at api/order POST", {
      status: 500,
    });
  }
}
