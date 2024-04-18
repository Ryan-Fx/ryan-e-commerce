import {
  getOrderPagesPagination,
  getOrdersPagination,
} from "@/actions/get-orders-pagination";
import Pagination from "@/components/pagination/pagination";
import { Button } from "@/components/ui/button";
import moment from "moment";
import Link from "next/link";
import { FaRegClock, FaRegCalendarCheck } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";

export default async function Orders({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const itemPerPage = 5;

  const orders = await getOrdersPagination(currentPage, itemPerPage);
  const totalPages = await getOrderPagesPagination(itemPerPage);

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
                  <div className="py-1 px-3 text-white bg-rose-500 rounded-full">
                    {order.status === "PENDING" && (
                      <p className="flex gap-2">
                        <FaRegClock size={18} className="text-white" />
                        Pending
                      </p>
                    )}
                    {order.status === "SHIPPED" && (
                      <p>
                        <MdDeliveryDining
                          size={20}
                          className="text-green-400"
                        />
                        Shipped
                      </p>
                    )}
                    {order.status === "DELIVERED" && (
                      <p>
                        <FaRegCalendarCheck
                          size={20}
                          className="text-green-400"
                        />
                        Delivered
                      </p>
                    )}
                  </div>
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
        <div className="flex justify-center mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
