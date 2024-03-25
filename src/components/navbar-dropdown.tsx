"use client";

import { PiShoppingCartLight } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";
import useCartStore from "@/store/use-cart-store";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";

interface UserProps {
  user: User | null;
}

export default function NavbarDropdown({ user }: UserProps) {
  const { cartItems } = useCartStore();
  const pathname = usePathname();
  const { data: session } = useSession();

  const cartCount = cartItems.length;

  return (
    <div className="flex justify-end items-center gap-6 w-full">
      {pathname !== "/cart" && (
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
      )}
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            {" "}
            <p className="text-primary-foreground text-sm capitalize hover:text-purple-400">
              {user?.name}
            </p>{" "}
            <FaChevronDown size={16} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[170px]">
            <DropdownMenuLabel>My Account </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Order</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-semibold text-[16px]">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
