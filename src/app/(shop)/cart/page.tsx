import Cart from "@/components/cart/cart";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ryan Store | Cart",
  description: "Ecommerce Website",
  icons: {
    icon: "/icon.png",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "USER") redirect("/admin");

  return (
    <div
      className={cn("text-muted-foreground min-h-screen", poppins.className)}
    >
      <Cart />
    </div>
  );
}
