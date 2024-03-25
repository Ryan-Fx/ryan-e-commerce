import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const CategoryFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
  });

  try {
    const body = await req.json();
    const validatedBody = CategoryFormSchema.parse(body);

    if (!validatedBody)
      return new NextResponse("Invalid data", { status: 500 });

    const existingCategory = await prisma.category.findUnique({
      where: {
        name: validatedBody.name,
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { category: null, message: "Category already exists!" },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({
      data: {
        ...validatedBody,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("error at api/product POST", error);
    return new NextResponse("internal Server Error at api/category POST", {
      status: 500,
    });
  }
}
