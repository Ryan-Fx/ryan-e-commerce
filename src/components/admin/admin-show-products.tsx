import { getProducts } from "@/actions/get-products";
import ProductCard from "../product-shop/product-card";

export default async function AdminShowProducts() {
  const products = await getProducts();

  return (
    <div className="bg-slate-50 p-2 rounded-md h-[450px] overflow-y-auto">
      <h1 className="text-xl">Products List</h1>
      <div className="flex flex-wrap gap-4 justify-between p-4">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
