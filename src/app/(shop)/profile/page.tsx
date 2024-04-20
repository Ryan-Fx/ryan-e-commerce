import { getUserById } from "@/actions/get-user-by-id";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { Mina, Poppins } from "next/font/google";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddressForm from "@/components/address/address-form";
import Image from "next/image";

const mina = Mina({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const user = await getUserById(userId as string);
  console.log(user);

  return (
    <div className="min-h-screen">
      <div className={cn("w-full py-10 px-20", poppins.className)}>
        {/* <ProfileCard user={user} /> */}
        <Tabs
          defaultValue="account"
          className="w-[700px] h-[660px] mx-auto space-y-3 shadow-lg shadow-slate-500/60 rounded-md p-4"
        >
          <TabsList className="w-ful grid grid-cols-2">
            <TabsTrigger value="account">Profile</TabsTrigger>
            <TabsTrigger value="password">Address</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div>
              <div className="flex justify-center p-4">
                <Image
                  src={user?.image!}
                  alt={user?.name!}
                  width={200}
                  height={300}
                  className="rounded-md shadow-lg shadow-slate-500/60"
                />
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{user?.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{user?.address?.phoneNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div>
              <AddressForm address={user?.address} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
