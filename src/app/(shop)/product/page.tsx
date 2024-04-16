import { getProducts } from "@/actions/get-products";
import ProductCard from "@/components/product-shop/product-card";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Karla, Poppins } from "next/font/google";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ryan Store | Product",
  description: "Ecommerce Website",
  icons: {
    icon: "/icon.png",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function ProductPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";

  const products = await getProducts(query);

  return (
    <div className={cn("", poppins.className)}>
      {/* navbar */}
      <div className="px-40 py-4 space-y-8">
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

        <div className="flex flex-wrap justify-between gap-5 pb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
