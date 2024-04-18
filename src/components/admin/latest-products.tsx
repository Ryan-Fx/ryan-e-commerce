import ProductCard from "../product-shop/product-card";
import { ScrollArea } from "../ui/scroll-area";
import { getAdminProducts } from "@/actions/get-admin-products";
import AdminProductCard from "./admin-product-card";

export default async function LatestProducts() {
  const products = await getAdminProducts();

  return (
    <div className="bg-slate-50">
      <h1 className="text-xl p-1">Latest Products</h1>
      <ScrollArea className=" p-2 rounded-md h-[350px]">
        <div className="flex flex-wrap gap-4 justify-between p-4">
          {products.map((product) => (
            <AdminProductCard product={product} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
