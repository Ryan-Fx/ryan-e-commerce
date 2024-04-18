import { countCostumers } from "@/actions/count-costumers";
import { countOrders } from "@/actions/count-orders";
import { countProducts } from "@/actions/count-products";
import AdminShowProducts from "@/components/admin/latest-products";
import LatestOrders from "@/components/admin/latest-orders";
import LatestOrdersSke from "@/components/ui-skeleton/admin-dashboard/latest-orders-ske";
import ProductsSke from "@/components/ui-skeleton/admin-dashboard/products-ske";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LatestProducts from "@/components/admin/latest-products";

export default async function AdminPage() {
  const totalOrder = await countOrders();
  const totalCostumers = await countCostumers();
  const totalProducts = await countProducts();
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="space-y-5 p-1">
      <h1 className="text-xl">Admin Dashboard</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-slate-50 p-2 rounded-sm">
            <p className="font-semibold">Total Products </p>
            <p className="p-8 text-2xl font-semibold bg-white rounded-sm">
              {totalProducts}
            </p>
          </div>
          <div className="text-center bg-slate-50 p-2 rounded-sm">
            <p className="font-semibold">Total Orders </p>
            <p className="p-8 text-2xl font-semibold bg-white rounded-sm">
              {totalOrder}
            </p>
          </div>
          <div className="text-center bg-slate-50 p-2 rounded-sm">
            <p className="font-semibold">Total Costumers </p>
            <p className="p-8 text-2xl font-semibold bg-white rounded-sm">
              {totalCostumers}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-5 p-2">
            <Suspense fallback={<ProductsSke />}>
              <LatestProducts />
            </Suspense>
          </div>
          <div className="p-2 col-span-2">
            <Suspense fallback={<LatestOrdersSke />}>
              <LatestOrders />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
