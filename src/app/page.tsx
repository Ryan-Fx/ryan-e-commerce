import { getProducts } from "@/actions/get-products";
import LogoutBtn from "@/components/button/logout";
import CartCountHome from "@/components/cart-count-home";
import ProductCard from "@/components/product-shop/product-card";
import Search from "@/components/product-shop/search";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import { getHomeProducts } from "@/actions/get-home-products";

export const metadata: Metadata = {
  title: "Ryan Store",
  description: "Ecommerce Website",
  icons: {
    icon: "/icon.png",
  },
};

export default async function Home() {
  const products = await getHomeProducts();
  const session = await getServerSession(authOptions);

  return (
    <div>
      <header className="fixed top-0 right-0 left-0 backdrop-blur-md z-10">
        <nav className="bg-red-600 py-2 px-40 opacity-80">
          <div className="flex justify-between">
            <div className="flex justify-end items-center gap-6 w-full">
              {session && <CartCountHome />}
              {session ? (
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
                    <DropdownMenuItem>
                      <Link href={"/order"}>Order</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-semibold text-[16px]">
                      <LogoutBtn />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button asChild>
                    <Link href={"/login"}>Please Login</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="flex items-center px-40 bg-red-600 py-5 opacity-80">
          <Link href={"/"} className="w-full flex items-end">
            <HiMiniShoppingBag size={50} className="mr-4 text-secondary" />{" "}
            <span className="font-extrabold text-secondary text-4xl">
              <span className="mr-2 font-thin">|</span> Ryan Store
            </span>
          </Link>
          <Search />
        </div>
      </header>

      <main className="mt-40 mb-14">
        <div className="px-40 space-y-8">
          <div className="flex">
            <div>
              <Image
                src="/img/cora2.jpg"
                alt="logo"
                width={700}
                height={500}
                className="w-[800px]"
                priority
              />
            </div>
            <div className="w-[400px]">
              <Image
                src="/img/cora-right.png"
                alt="logo"
                width={500}
                height={400}
                priority
              />
              <Image
                src="/img/cora-right2.png"
                alt="logo"
                width={500}
                height={400}
                priority
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
