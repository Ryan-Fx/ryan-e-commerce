import { getAddress } from "@/actions/get-address";
import { getUserById } from "@/actions/get-user-by-id";
import NavbarShop from "@/components/navbar-shop";
import ProfileCard from "@/components/profile/profile-card";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { Mina } from "next/font/google";

const mina = Mina({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const user = await getUserById(userId as string);
  const address = await getAddress();
  console.log(address);

  return (
    <div className="bg-red-50 min-h-screen">
      <NavbarShop />
      <div className={cn("w-full py-10", mina.className)}>
        <ProfileCard user={user} address={address} />
      </div>
    </div>
  );
}
