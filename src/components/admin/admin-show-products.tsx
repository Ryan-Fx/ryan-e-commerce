import { getProducts } from "@/actions/get-products";
import ProductCard from "../product-shop/product-card";
import { ScrollArea } from "../ui/scroll-area";
import { getHomeProducts } from "@/actions/get-home-products";

export default async function AdminShowProducts() {
  const products = await getHomeProducts();

  return (
    <div className="bg-slate-50">
      <h1 className="text-xl p-1">Latest Products</h1>
      <ScrollArea className=" p-2 rounded-md h-[350px]">
        <div className="flex flex-wrap gap-4 justify-between p-4">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
