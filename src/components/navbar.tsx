import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";
import CartCount from "./cart-count";
import Link from "next/link";
import LogoutBtn from "./button/logout";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="sticky top-0 z-10 bg-red-600 py-2 px-40">
      <div className="flex justify-between">
        <div className="flex justify-end items-center gap-6 w-full">
          <CartCount />
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2">
                {" "}
                <p className="text-primary-foreground text-sm capitalize hover:text-purple-400">
                  {session.user.name}
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
                  <LogoutBtn />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
