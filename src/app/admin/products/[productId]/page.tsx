import { getProductById } from "@/actions/get-product-by-id";
import Image from "next/image";

export default async function ProductDetail({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(params.productId);

  return (
    <div className="grid grid-cols-2 gap-6 px-32 py-12">
      <div>
        <Image
          src={product!.image}
          alt={product!.name}
          width={500}
          height={600}
        />
      </div>
      <div className="space-y-4">
        <div className="text-xl">
          <h1 className="font-semibold">{product?.name}</h1>
          <p className="font-bold text-3xl text-red-500">
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(product!.price)}
          </p>
        </div>
        <p>{product?.description}</p>
        <p className="font-semibold">
          Category :{" "}
          <span className="font-normal">{product?.category.name}</span>
        </p>
      </div>
    </div>
  );
}
