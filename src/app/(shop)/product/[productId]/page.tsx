import { getProductById } from "@/actions/get-product-by-id";
import ProductDetailCard from "@/components/product-shop/product-detail-card";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";

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
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "USER") redirect("/admin");

  return (
    <div className={cn("", poppins.className)}>
      <ProductDetailCard product={product} />
    </div>
  );
}
