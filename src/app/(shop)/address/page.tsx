import AddressForm from "@/components/address/address-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ryan Store | Address",
  description: "Ecommerce Website",
  icons: {
    icon: "/icon.png",
  },
};

export default async function AddressPage() {
  return (
    <div>
      <div className="w-[600px] mx-auto p-6 space-y-4">
        <p className="text-center capitalize">
          Please input your valid Address
        </p>
        <AddressForm />
      </div>
    </div>
  );
}
