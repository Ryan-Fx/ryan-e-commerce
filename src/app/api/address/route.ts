import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const AddressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
  });

  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const validatedBody = AddressSchema.parse(body);

    if (!validatedBody) {
      return new NextResponse("invalid data", { status: 500 });
    }

    const address = await prisma.address.create({
      data: {
        ...validatedBody,
        userId,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("error at api/address POST route :", error);
    return new NextResponse("Internal server error api/address", {
      status: 500,
    });
  }
}
