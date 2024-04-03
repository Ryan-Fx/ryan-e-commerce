"use client";

import Link from "next/link";
import React from "react";
import { HiMiniShoppingBag } from "react-icons/hi2";
import Search from "./product-shop/search";
import { Shadows_Into_Light } from "next/font/google";
import { cn } from "@/lib/utils";

const shadows = Shadows_Into_Light({
  subsets: ["latin"],
  weight: ["400"],
});

export default function NavbarShop() {
  return (
    <div
      className={cn(
        "flex items-center px-40 bg-red-600 py-5",
        shadows.className
      )}
    >
      <Link href={"/"} className="w-full flex items-end">
        <HiMiniShoppingBag size={50} className="mr-4 text-secondary" />
        <span className="font-extrabold text-secondary text-4xl">
          <span className="mr-2 font-thin">|</span> Ryan Store
        </span>
      </Link>
      <Search />
    </div>
  );
}
