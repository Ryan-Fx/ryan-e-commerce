import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { addressId: string } }
) {
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

    if (!validatedBody)
      return new NextResponse("Invalid data", { status: 500 });

    const address = await prisma.address.update({
      where: {
        id: params.addressId,
      },
      data: { ...body },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("error at api/address/[addressId] PATCH", error);
    return new NextResponse(
      '{"internal Server Error api/address/[addressId] PATCH"}',
      { status: 500 }
    );
  }
}
