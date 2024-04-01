"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Address, User } from "@prisma/client";

interface UserProp {
  user: User | null;
  address: Address | null | undefined;
}

export default function ProfileCard({ user, address }: UserProp) {
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

              <div key={address?.id}>
                <p>{address?.street}</p>
                <p>{address?.city}</p>
                <p>{address?.state}</p>
                <p>{address?.postalCode}</p>
                <p>{address?.phoneNumber}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
