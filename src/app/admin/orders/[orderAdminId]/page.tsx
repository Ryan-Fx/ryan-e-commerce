import { getOrderById } from "@/actions/get-order-by-id";
import { Prisma } from "@prisma/client";

export default async function OrderAdminDetail({
  params,
}: {
  params: { orderAdminId: string };
}) {
  const order = await getOrderById(params.orderAdminId);
  const items = order?.items as Prisma.JsonObject[];

  return <div>OrderAdminDetail</div>;
}
