import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: { ...body },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("error at api/product/[productId] PATCH", error);
    return new NextResponse(
      '{"internal Server Error api/product/[productId] PATCH"}',
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("error at api/product/[productId] DELETE", error);
    return new NextResponse(
      '{"internal Server Error api/product/[productId] DELETE"}',
      { status: 500 }
    );
  }
}
