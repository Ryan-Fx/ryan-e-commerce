"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: Product;
}

export default function ProductCard({ product }: ProductProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/admin/products/${product.id}`)}
      title="click to see detail"
      className="w-[200px] h-[300px] flex flex-col items-center cursor-pointer group hover:scale-105 transition duration-300 border overflow-hidden bg-primary-foreground"
    >
      <div className="h-[300px] group-hover:scale-75 transition duration-300">
        <Image
          width={300}
          height={400}
          priority={true}
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="p-2 w-full">
        <p className="text-sm">{product.name.substring(0, 45)}...</p>
        <p className="text-rose-400">Rp {product.price}</p>
      </div>
    </div>
  );
}
