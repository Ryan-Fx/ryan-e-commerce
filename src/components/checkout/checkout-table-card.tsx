"use client";

import useCartStore from "@/store/use-cart-store";
import Image from "next/image";

export default function CheckoutTableCard() {
  const { cartItems } = useCartStore();

  return (
    <>
      {" "}
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-4 px-2">Products Ordered</th>
            <th>Item Price</th>
            <th>Amount</th>
            <th>Item Subtotal</th>
          </tr>
        </thead>
        {cartItems.map((item) => (
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
                {item.price * item.quantity!}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}
