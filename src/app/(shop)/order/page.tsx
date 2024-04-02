import { getOrderById } from "@/actions/get-order-by-id";
import { getUserOrders } from "@/actions/get-user-orders";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { IoMdEye } from "react-icons/io";
import moment from "moment";

export default async function OrderPage() {
  const session = await getServerSession(authOptions);
  const order = await getOrderById(session?.user.id as string);
  const userOrders = await getUserOrders(session?.user.id as string);

  const orderObject = order?.items as Prisma.JsonObject[];
  // const joss = JSON.stringify(orderObject);
  // const parsedJoss = JSON.parse(joss);

  if (!userOrders)
    return (
      <div className="py-6 px-40 space-y-6 min-h-screen">
        <h1 className="text-center font-semibold text-xl">
          Your Order History is Empty
        </h1>
      </div>
    );

  return (
    <div className="py-6 px-40 space-y-6 min-h-screen">
      <h1 className="text-center font-semibold text-xl">Your Order History</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userOrders?.map((order, index) => (
            <tr key={order?.id}>
              <td>{index + 1}</td>
              <td>{order?.id}</td>
              <td>{order?.amount}</td>
              <td>{order?.status}</td>
              <td>{moment(order?.createdAt).fromNow()}</td>
              <td>
                <Button variant={"ghost"} asChild>
                  <Link href={`/order/${order?.id}`}>
                    <IoMdEye size={25} />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
