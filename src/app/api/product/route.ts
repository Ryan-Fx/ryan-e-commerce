import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().min(1, "Price is required"),
    categoryId: z.string().min(1, "Category is required"),
    image: z.string().min(1, "Image is required"),
  });

  try {
    const body = await req.json();
    const validatedBody = ProductSchema.parse(body);

    if (!validatedBody) {
      return new NextResponse("invalid data", { status: 500 });
    }

    const product = await prisma.product.create({
      data: {
        ...validatedBody,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("error at api/product POST", error);
    return new NextResponse("internal Server Error at api/product POST", {
      status: 500,
    });
  }
}
