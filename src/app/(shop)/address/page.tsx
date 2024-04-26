import { getAddressById } from "@/actions/get-address-by-id";
import AddressForm from "@/components/address/address-form";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ryan Store | Address",
  description: "Ecommerce Website",
  icons: {
    icon: "/icon.png",
  },
};

export default async function AddressPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "USER") redirect("/admin");

  const address = await getAddressById(session.user.id);

  return (
    <div>
      <div className="w-[600px] mx-auto p-6 space-y-4">
        <p className="text-center capitalize">
          Please input your valid Address
        </p>
        <AddressForm address={address} />
      </div>
    </div>
  );
}
