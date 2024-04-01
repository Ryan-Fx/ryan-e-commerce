import AddressForm from "@/components/address/address-form";

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
