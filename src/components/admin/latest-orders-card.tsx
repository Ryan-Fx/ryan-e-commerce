"use client";

import { useRouter } from "next/navigation";

interface OrderProps {
  order: OrderType;
}

interface OrderType {
  id: string;
  amount: number;
  user: {
    name: string | null;
    email: string | null;
  };
}

export default function LatestOrdersCard({ order }: OrderProps) {
  const router = useRouter();

  return (
    <div
      className="flex justify-between cursor-pointer bg-white hover:bg-slate-200 p-3 rounded-sm"
      onClick={() => {
        router.push(`/admin/orders/${order.id}`);
      }}
    >
      <div>
        <p className="font-semibold">{order.user.name}</p>
        <p className="text-sm text-slate-500">{order.user.email}</p>
      </div>
      <div>
        <p className="font-semibold text-red-500">
          {Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(order.amount)}
        </p>
      </div>
    </div>
  );
}
