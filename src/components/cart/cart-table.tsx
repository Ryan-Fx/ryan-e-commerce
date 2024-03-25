import useCartStore from "@/store/use-cart-store";
import { Button } from "../ui/button";
import { BiMinus, BiPlus } from "react-icons/bi";
import Image from "next/image";

export default function CartTable() {
  const { cartItems, decreaseQuantity, increaseQuantity, removeItemFromCart } =
    useCartStore();

  return (
    <div>
      <table className="w-full text-sm">
        <thead className="text-left">
          <tr className="border-b">
            <th className="py-4 px-2 w-[600px]">Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-3 px-2">
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
              <td>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(item.price)}
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button
                    disabled={item.quantity! <= 1}
                    variant={"outline"}
                    onClick={() => decreaseQuantity(item.id)}
                    className="rounded-none"
                  >
                    <BiMinus size={20} />
                  </Button>
                  <span className="border py-2 px-4">{item.quantity}</span>
                  <Button
                    variant={"outline"}
                    onClick={() => increaseQuantity(item.id)}
                    className="rounded-none"
                  >
                    <BiPlus size={20} />
                  </Button>
                </div>
              </td>
              <td>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(item.price * item.quantity!)}
              </td>
              <td>
                <Button
                  variant={"outline"}
                  onClick={() => removeItemFromCart(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
