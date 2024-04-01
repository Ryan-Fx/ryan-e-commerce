import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        ...body,
      },
    });

    console.log(product);
    return NextResponse.json(product);
  } catch (error) {
    console.log("error at api/product POST", error);
    return new NextResponse("internal Server Error at api/product POST", {
      status: 500,
    });
  }
}
