import { getOrderById } from "@/actions/get-order-by-id";
import { Prisma } from "@prisma/client";
import moment from "moment";
import Image from "next/image";

export default async function OrderDetail({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await getOrderById(params.orderId);
  const items = order?.items as Prisma.JsonObject[];
  console.log(order);
  console.log(items);

  return (
    <div className="py-6 px-40 space-y-6 min-h-screen">
      <h1 className="text-center font-semibold text-xl">Order Detail</h1>
      <div className="flex justify-between">
        <p>Order ID: {order?.id}</p>
        <div className="text-right">
          <p>Order Date: {moment(order?.createdAt).format("MMMM Do YYYY")}</p>
          <p>Order Time: {moment(order?.createdAt).format("h:mm a")}</p>
        </div>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-4 px-2">Products Ordered</th>
            <th>Item Price</th>
            <th>Amount</th>
            <th>Item Subtotal</th>
          </tr>
        </thead>

        {items.map((item: any) => (
          <tbody>
            <tr key={item.id}>
              <td className="py-2 px-2 ">
                <div className="flex gap-2 w-[500px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                  <p>{item.name}</p>
                </div>
              </td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity!}</td>
            </tr>
            <tr className="border-b">
              <td className="py-4 px-2 text-right" colSpan={3}>
                Order Total ({item.quantity} item{item.quantity! > 1 && "s"}) :
              </td>
              <td className=" font-semibold text-red-500 text-xl">
                {item.price * item.quantity}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <div className="text-right flex justify-between">
        <p>Order Status : {order?.status}</p>
        <p>Amount: {order?.amount}</p>
      </div>
    </div>
  );
}
