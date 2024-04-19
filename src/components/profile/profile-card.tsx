"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Address, User } from "@prisma/client";
import { use } from "react";
import Link from "next/link";

type UserWithAddress = User & {
  address: Address | null;
};

export default function ProfileCard({
  user,
}: {
  user: UserWithAddress | null;
}) {
  return (
    <div className="flex justify-center">
      <Card className="w-[800px] border-none shadow-lg">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>
            Manage your profile information to control, protect and secure your
            account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-center mb-8">
              <Image
                src={user?.image!}
                alt={user?.name!}
                width={150}
                height={150}
                className="rounded-md shadow-lg shadow-slate-500/60"
              />
            </div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{user?.name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{user?.email}</td>
                </tr>
              </tbody>
            </table>

            {user?.address ? (
              <div className="mt-4">
                <p>Address</p>
                <div className="flex flex-wrap gap-4">
                  <div className="w-[150px] text-right">
                    <p>Street</p>
                    <p>City</p>
                    <p>State</p>
                    <p>Postal Code</p>
                    <p>Phone Number</p>
                  </div>

                  <div key={user?.address?.id}>
                    <p>{user?.address?.street}</p>
                    <p>{user?.address?.city}</p>
                    <p>{user?.address?.state}</p>
                    <p>{user?.address?.postalCode}</p>
                    <p>{user?.address?.phoneNumber}</p>
                  </div>
                </div>
              </div>
            ) : (
              <Link href={"/address"} className="mt-4">
                Please input your address first
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
