import { getOrderById } from "@/actions/get-order-by-id";
import { getUserOrders } from "@/actions/get-user-orders";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function OrderPage() {
  const session = await getServerSession(authOptions);
  const order = await getOrderById(session?.user.id as string);
  const userOrders = await getUserOrders(session?.user.id as string);

  const orderObject = order?.items as Prisma.JsonObject[];
  // const joss = JSON.stringify(orderObject);
  // const parsedJoss = JSON.parse(joss);

  return (
    <div className="py-6 px-40">
      {/* <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-4 px-2">Products Ordered</th>
            <th>Item Price</th>
            <th>Amount</th>
            <th>Item Subtotal</th>
          </tr>
        </thead>
        {orderObject.map((item: any) => (
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
      </table> */}

      <table className="w-full text-left">
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Status</th>
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
              <td>tes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
