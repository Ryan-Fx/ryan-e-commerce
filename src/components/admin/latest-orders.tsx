import { getLatestOrders } from "@/actions/get-latest-orders";
import LatestOrdersCard from "./latest-orders-card";

export default async function LatestOrders() {
  const latestOrders = await getLatestOrders();

  return (
    <div className="bg-slate-50 p-1 rounded-md space-y-2">
      <h1 className="text-xl">Latest Orders</h1>
      <div className="space-y-3 p-2">
        {latestOrders.map((order) => (
          <LatestOrdersCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
