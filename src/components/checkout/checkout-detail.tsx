"use client";

import useCartStore from "@/store/use-cart-store";
import CheckoutTableCard from "./checkout-table-card";

export default function CheckoutDetail() {
  const { addItemToCart } = useCartStore();

  return (
    <div>
      <CheckoutTableCard />
    </div>
  );
}
