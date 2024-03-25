import { getProducts } from "@/actions/get-products";
import React from "react";

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <div className="p-4">
      {products.map((product) => (
        <p key={product.id}>
          {product.name} - {product.price}
        </p>
      ))}
    </div>
  );
}
