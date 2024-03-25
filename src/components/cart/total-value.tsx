import useCartStore from "@/store/use-cart-store";
import { CartProduct } from "@/types/cart-product";

const getTotal = (cartItem: CartProduct[]) => {
  let totalQty = 0;
  let totalPrice = 0;

  cartItem.map((item) => {
    totalQty += item.quantity!;
    totalPrice += item.price * item.quantity!;
  });

  return { totalPrice, totalQty };
};

export default function TotalValue() {
  const { cartItems } = useCartStore();

  const quantity = getTotal(cartItems).totalQty;
  const total = getTotal(cartItems).totalPrice;

  const totalProduct = cartItems.length;

  return (
    <div className=" flex flex-col text-xl space-y-7">
      <p className="text-right text-sm text-red-500 p-1 rounded-sm">
        <span className="bg-red-100 py-1 px-2 rounded">
          ({totalProduct}) product{totalProduct > 1 && "s"} and ({quantity})
          item
          {quantity > 1 && "s"} in your cart
        </span>
      </p>
      <div className="flex justify-between">
        {" "}
        <p className="font-semibold">Total Price :</p>
        <p className="font-medium text-red-500">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(total)}
        </p>
      </div>
    </div>
  );
}
