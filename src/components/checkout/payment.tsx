"use client";

import useCartStore from "@/store/use-cart-store";
import { CartProduct } from "@/types/cart-product";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ShippingCostProp {
  shippingCost: number;
}

function getTotal(cartItems: CartProduct[]) {
  let totalQty = 0;
  let totalPrice = 0;

  cartItems.map((item) => {
    totalQty += item.quantity!;
    totalPrice += item.price * item.quantity!;
  });

  return { totalQty, totalPrice };
}

export default function Payment({ shippingCost }: ShippingCostProp) {
  const { cartItems, clearCart } = useCartStore();
  console.log(cartItems);

  const router = useRouter();

  const quantity = getTotal(cartItems).totalQty;
  const total = getTotal(cartItems).totalPrice;

  let amount = total + shippingCost;

  const totalProduct = cartItems.length;
  console.log(totalProduct);

  console.log(quantity, total);

  function onOrderPayment() {
    axios
      .post("/api/order", {
        amount: amount,
        items: cartItems.map((item) => {
          return {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          };
        }),
      })
      .then((res) => {
        toast.success("Payment Successful");
        clearCart();
        router.refresh();
        router.push("/order");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  }

  return (
    <>
      <div className="text-lg text-red-500 flex items-center">
        <BsCreditCard2FrontFill size={20} className="mr-2" />
        Payment
      </div>
      <div className="flex justify-end px-20 mt-2">
        <table>
          <tbody>
            <tr>
              <td className="w-[150px] py-2">Item Amount : </td>
              <td className="w-[150px] text-right">{quantity}</td>
            </tr>

            <tr>
              <td className="py-2">Merchandise Total : </td>
              <td className="text-right">
                {total.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b-2 border-red-400">
                Shipping Total :
              </td>
              <td className="text-right border-b-2 border-red-400">
                Rp {shippingCost}
              </td>
            </tr>
            <tr>
              <td className="py-2">Total Payment :</td>
              <td className="text-right text-red-500 text-xl font-semibold">
                {total + shippingCost}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="py-8 flex justify-between px-20 items-center">
        <p>
          By clicking “Place Order”, I agree to the Product Protection's{" "}
          <span className="text-blue-500 hover:text-blue-700">
            Terms & Conditions.
          </span>
        </p>
        <Button
          onClick={onOrderPayment}
          className="bg-red-500 hover:bg-red-600 rounded-sm w-[200px]"
        >
          Place Order
        </Button>
      </div>
    </>
  );
}
