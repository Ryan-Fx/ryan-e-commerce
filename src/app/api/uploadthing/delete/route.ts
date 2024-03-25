// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utApi = new UTApi();

export async function POST(req: Request) {
  //   const session = await getServerSession(authOptions);
  //   if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { imgKey } = await req.json();

  try {
    const res = await utApi.deleteFiles(imgKey);
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error at uploadthing/delete: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
