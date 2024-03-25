"use client";

import useCartStore from "@/store/use-cart-store";
import Search from "../product-shop/search";
import { Button } from "../ui/button";
import CartTable from "./cart-table";
import TotalValue from "./total-value";
import Link from "next/link";
import { IoBagHandle } from "react-icons/io5";

export default function Cart() {
  const { cartItems, clearCart } = useCartStore();

  return (
    <div className="p-6 bg-slate-50 space-y-4">
      <Search />
      <h1 className="text-2xl font-thin text-center py-4">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="space-y-5">
          <CartTable />
          <div className="flex justify-between">
            <Button
              onClick={() => clearCart()}
              className="bg-red-500 hover:bg-red-600 rounded-sm"
            >
              Clear Cart
            </Button>
            <div className="w-[350px] space-y-2">
              <TotalValue />
              <div className="flex justify-end">
                <Button className="w-[160px] rounded-sm" asChild>
                  <Link href={"/checkout"}>Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl space-y-3">
          <p>Your cart is empty!</p>
          <Button variant={"outline"} asChild>
            <Link href={"/product"}>
              <IoBagHandle size={20} className="mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
