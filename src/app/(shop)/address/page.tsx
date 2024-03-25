import AddressForm from "@/components/address/address-form";
import React from "react";

export default function AddressPage() {
  return (
    <div className="w-[600px] mx-auto p-6 space-y-4">
      <p className="text-center capitalize">Please input your valid Address</p>
      <AddressForm />
    </div>
  );
}
