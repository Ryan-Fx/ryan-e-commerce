import { getOrders } from "@/actions/get-orders";
import { Button } from "@/components/ui/button";
import moment from "moment";
import Link from "next/link";
import { FaRegClock, FaRegCalendarCheck } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";

export default async function Orders() {
  const orders = await getOrders();

  return (
    <div className="w-full p-2 space-y-3">
      <h1>Orders List</h1>
      <div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="py-4 px-2">#</th>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Ordered At</th>
              <th>Actions</th>
            </tr>
          </thead>
          {orders.map((order, index) => (
            <tbody className="text-muted-foreground">
              <tr key={order.id} className="border-b">
                <td className="py-3 px-2">{index + 1}</td>
                <td>{order.id}</td>
                <td>{order.amount}</td>
                <td className="flex gap-1 items-center py-5">
                  <div>
                    {order.status === "PENDING" && (
                      <FaRegClock size={20} className="text-red-400" />
                    )}
                  </div>
                  <div>
                    {order.status === "DELIVERED" && (
                      <FaRegCalendarCheck size={20} />
                    )}
                  </div>
                  {order.status}
                </td>
                <td>{moment(order.createdAt).fromNow()}</td>
                <td>
                  <Button variant={"ghost"} asChild>
                    <Link href={`/admin/orders/${order.id}`}>
                      <IoMdEye size={20} title="See detail" />
                    </Link>
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
