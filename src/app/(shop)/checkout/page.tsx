import { getAddress } from "@/actions/get-address";
import CheckoutDetail from "@/components/checkout/checkout-detail";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { MdLocationOn } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import Payment from "@/components/checkout/payment";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);
  const address = await getAddress();

  const shippingCost = 46000;

  return (
    <div className="p-6 bg-red-50 space-y-6 text-muted-foreground">
      <h1 className="text-center text-2xl font-medium">Checkout</h1>
      <div className="p-4 bg-white shadow-md rounded-md">
        <div className="text-lg text-red-500 flex items-center">
          <MdLocationOn size={20} className="mr-1" />
          Delivery Address
        </div>
        <div className="flex space-x-48 mt-2">
          <div className="font-semibold">
            <p>{session?.user.name}</p>
            {address.map((adu) => (
              <p>{adu.phoneNumber}</p>
            ))}
          </div>
          {address.map((ad) => (
            <p>
              {ad.street}, {ad.city}, {ad.state}, {ad.postalCode}
            </p>
          ))}
        </div>
      </div>
      <div className="p-4 bg-white shadow-md rounded-md">
        <CheckoutDetail />
      </div>
      <div className="p-4 bg-white shadow-md rounded-md">
        <div className="text-lg text-red-500 flex items-center">
          <FaShippingFast size={20} className="mr-2" />
          Shipping Option
        </div>
        <div className=" flex gap-48 mt-2">
          <p className="text-teal-500">Reguler</p>
          <p>Rp {shippingCost}</p>
        </div>
      </div>
      <div className="p-4 bg-white shadow-md rounded-md">
        <Payment shippingCost={shippingCost} />
      </div>
    </div>
  );
}
