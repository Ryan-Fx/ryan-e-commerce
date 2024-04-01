"use client";

import { Category, Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import useCartStore from "@/store/use-cart-store";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: ProductWithCategory | null;
}

export type ProductWithCategory = Product & {
  category: Category;
  quantity?: number;
};

export default function ProductDetailCard({ product }: ProductProps) {
  const [total, setTotal] = useState(1);

  const { addItemToCart, cartItems } = useCartStore();
  const { status } = useSession();
  const router = useRouter();

  const itemExist = cartItems.find((item) => item.id === product?.id);

  const onAddToCart = () => {
    addItemToCart({ ...product!, quantity: total });
    toast.success("Added to cart");
  };

  return (
    <div className="grid grid-cols-2 px-32 py-6">
      <div className="mx-auto">
        <Image
          src={product!.image}
          width={500}
          height={600}
          alt={product!.name}
        />
      </div>
      <div className="space-y-4 text-justify text-muted-foreground">
        <div className="text-xl space-y-2">
          <h1 className="font-semibold text-primary">{product?.name}</h1>
          <p className="font-bold text-red-600 text-3xl">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(product?.price!)}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{product?.description}</p>
        <p className="font-semibold">
          Category :{" "}
          <span className="font-normal">{product?.category.name}</span>
        </p>

        {!itemExist && (
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => setTotal(total - 1)}
              disabled={total <= 1}
              variant={"outline"}
            >
              -
            </Button>
            <span>{total}</span>
            <Button onClick={() => setTotal(total + 1)} variant={"outline"}>
              +
            </Button>
          </div>
        )}
        <div className="flex flex-col gap-2">
          {cartItems.length > 0 && itemExist && (
            <div className="flex items-center gap-2 border rounded-sm p-1 w-[170px]">
              <FaCheckCircle className="text-teal-400" />
              <p className="text-xs">Product added to cart</p>
            </div>
          )}
          {cartItems.length > 0 && itemExist ? (
            <div className="flex justify-between">
              <Button
                className="w-[170px] bg-red-500 rounded-sm hover:bg-red-600"
                asChild
              >
                <Link href={"/cart"}>View Cart</Link>
              </Button>
              <Button variant={"outline"} asChild>
                <Link href={"/product"}>
                  <IoReturnUpBackSharp size={20} className="mr-2" />
                  Continue shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => {
                  status === "unauthenticated"
                    ? router.push("/login")
                    : onAddToCart();
                }}
                className="bg-red-600 hover:bg-red-500"
              >
                <IoCartOutline size={20} className="mr-2" />
                Add To Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
