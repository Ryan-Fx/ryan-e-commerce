import { getOrderById } from "@/actions/get-order-by-id";
import { Prisma } from "@prisma/client";
import moment from "moment";
import Image from "next/image";

export default async function OrderAdminDetail({
  params,
}: {
  params: { orderAdminId: string };
}) {
  const order = await getOrderById(params.orderAdminId);
  const items = order?.items as Prisma.JsonObject[];

  return (
    <div className="p-6 space-y-6 text-muted-foreground">
      <h1 className="text-xl">Order Detail</h1>
      <div className="grid grid-cols-10 text-sm font-semibold">
        <div className="col-span-8">
          <p>Order ID : {order?.id}</p>
          <p>Costumer : {order?.user.name}</p>
        </div>
        <div className="col-span-2">
          <p>Order Date : {moment(order?.createdAt).format("MMMM Do YYYY")}</p>
          <p>Order Time : {moment(order?.createdAt).format("h:mm a")}</p>
        </div>
      </div>
      <div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-2">Product Ordered</th>
              <th>Item Price</th>
              <th>Amount</th>
              <th>Item Subtotal</th>
            </tr>
          </thead>
          {items.map((item: any) => (
            <tbody>
              <tr>
                <td className="py-3 px-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                </td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
              <tr className="border-b">
                <td colSpan={3} className="text-right py-4 px-2">
                  Order Total ({item.quantity} item{item.quantity > 1 && "s"}) :
                </td>
                <td className="text-lg text-red-500 font-semibold">
                  {item.price * item.quantity}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="flex justify-between">
        <p>Order Status : {order?.status}</p>
        <p className="text-red-500 font-semibold">Amount : {order?.amount}</p>
      </div>
    </div>
  );
}
