import { getProducts } from "@/actions/get-products";
import AddProduct from "@/components/product-admin/add-product-form";
import React from "react";

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <div>
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}
