import { getProductById } from "@/actions/get-product-by-id";
import AdminProductDetail from "@/components/admin/admin-product-detail";
import React from "react";

export default async function LatestProductDetail({
  params,
}: {
  params: { latestProductId: string };
}) {
  const product = await getProductById(params.latestProductId);

  return (
    <div>
      <AdminProductDetail product={product} />
    </div>
  );
}
