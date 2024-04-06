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
      className="flex flex-col cursor-pointer bg-white hover:bg-slate-200 p-3 rounded-sm"
      onClick={() => {
        router.push(`/admin/orders/${order.id}`);
      }}
    >
      <div className="text-sm flex justify-between">
        <p className="font-semibold">{order.user.name}</p>
        <p className="font-semibold text-red-500 text-sm">
          {Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(order.amount)}
        </p>
      </div>
      <div>
        <p className="text-slate-500 text-xs">{order.user.email}</p>
      </div>
    </div>
  );
}
