import { getCustomerById } from "@/actions/get-customer-by-id";
import moment from "moment";

export default async function CustomerOrderDetail({
  params,
}: {
  params: { customerId: string };
}) {
  const customer = await getCustomerById(params.customerId);

  return (
    <div className="w-full p-4 space-y-6">
      <h1>Order History</h1>
      <div className="flex justify-between">
        <p className="font-semibold text-sm">{customer?.name}</p>
        <p className="font-semibold text-sm text-red-500">
          Total Order : {customer?.orders.length}
        </p>
      </div>
      <div>
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="bg-slate-100">
            <tr>
              <th className="py-4 px-2">#</th>
              <th>Order ID</th>
              <th>Ordered Time</th>
              <th>Amount</th>
            </tr>
          </thead>
          {customer?.orders.map((order, index) => (
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-2">{index + 1}</td>
                <td>{order.id}</td>
                <td>{moment(order.createdAt).fromNow()}</td>
                <td className="text-red-500">
                  {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(order.amount)}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
