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
import { RxDashboard } from "react-icons/rx";
import { getShopProducts } from "@/actions/get-shop-products";

export const metadata: Metadata = {
  title: "Ryan Store",
  description: "Ecommerce Website",
  icons: {
    icon: "/icon.png",
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  const products = await getShopProducts(query);
  const session = await getServerSession(authOptions);

  return (
    <div>
      <header className="sticky top-0  backdrop-blur-md z-10">
        <nav className="bg-red-600 py-2 px-40 bg-opacity-85">
          <div className="flex justify-between">
            <div className="flex justify-end items-center gap-6 w-full">
              {session && session?.user.role !== "ADMIN" && <CartCountHome />}
              {session && session?.user.role !== "ADMIN" && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2">
                    <Image
                      src={session.user.image!}
                      alt={session.user.name!}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <p className="text-primary-foreground text-sm capitalize hover:text-fuchsia-400">
                      {session?.user.name}
                    </p>
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
              )}
              {!session && (
                <>
                  <Button asChild>
                    <Link href={"/login"}>Please Login</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="flex items-center px-40 bg-red-600 py-4 opacity-85">
          <Link href={"/"} className="w-full flex items-end">
            <HiMiniShoppingBag size={50} className="mr-4 text-secondary" />{" "}
            <span className="font-extrabold text-secondary text-4xl">
              <span className="mr-2 font-thin">|</span> Ryan Store
            </span>
          </Link>
          <Search />
        </div>
      </header>

      {session?.user.role !== "ADMIN" && (
        <main className="mt-4 mb-14">
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
      )}
      {session && session.user.role !== "USER" && (
        <div className="mt-[300px] mb-14 text-center space-y-4">
          <h1 className=" text-3xl font-semibold text-rose-500">
            Welcome back, Admin 😎
          </h1>
          <Button asChild>
            <Link href={"/admin"}>
              <RxDashboard size={18} className="mr-2 text-blue-500" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      )}
      {session?.user.role !== "ADMIN" && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
}
