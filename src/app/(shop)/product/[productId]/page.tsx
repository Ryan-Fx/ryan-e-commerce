import { getProductById } from "@/actions/get-product-by-id";
import ProductDetailCard from "@/components/product-shop/product-detail-card";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Ryan Store | Product Detail",
  description: "Ecommerce Website",
  icons: {
    icon: "/icon.png",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(params.productId);

  return (
    <div className={cn("", poppins.className)}>
      <ProductDetailCard product={product} />
    </div>
  );
}
