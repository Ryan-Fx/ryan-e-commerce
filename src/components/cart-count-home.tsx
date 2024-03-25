"use client";

import { cn } from "@/lib/utils";
import useCartStore from "@/store/use-cart-store";
import Link from "next/link";
import React from "react";
import { PiShoppingCartLight } from "react-icons/pi";

export default function CartCountHome() {
  const { cartItems } = useCartStore();

  const cartCount = cartItems.length;

  return (
    <>
      <Link
        href={"/cart"}
        title="Cart"
        className="relative text-primary-foreground"
      >
        <PiShoppingCartLight size={30} />
        {cartCount > 0 && (
          <p
            className={cn(
              "py-1 px-2 rounded-full text-xs absolute -top-1 -right-3 bg-black",
              { "px-[10px]": cartCount == 1 }
            )}
          >
            {cartCount}
          </p>
        )}
      </Link>
    </>
  );
}
