import Cart from "@/components/cart/cart";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CartPage() {
  return (
    <div
      className={cn("text-muted-foreground min-h-screen", poppins.className)}
    >
      <Cart />
    </div>
  );
}
