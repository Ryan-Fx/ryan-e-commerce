import { getProductById } from "@/actions/get-product-by-id";
import { ScrollArea } from "@/components/ui/scroll-area";
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
        <ScrollArea className="h-[300px] w-full pr-3 text-justify">
          {product?.description}
        </ScrollArea>
        <p className="font-semibold">
          Category :{" "}
          <span className="font-normal">{product?.category.name}</span>
        </p>
        {product?.inStock ? (
          <p className="py-1 text-center bg-teal-400 w-24 text-white rounded-full">
            In Stock
          </p>
        ) : (
          <p className="py-1 text-center bg-rose-400 w-32 text-white rounded-full">
            Out Of Stock
          </p>
        )}
      </div>
    </div>
  );
}
