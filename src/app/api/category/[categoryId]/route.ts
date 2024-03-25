import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const body = await req.json();

    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: { ...body },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("error at api/category/[categoryId] PATCH", error);
    return new NextResponse(
      '{"internal Server Error api/category/[categoryId] PATCH"}',
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("error at api/category/[categoryId] DELETE", error);
    return new NextResponse(
      '{"internal Server Error api/category/[categoryId] DELETE"}',
      { status: 500 }
    );
  }
}
