"use client";

import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Address, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const PhoneSchema = z.object({
  phoneNumber: z.string().min(1, "Phone is required"),
});

interface UserProp {
  user: User | null;
  address: Address[];
}

export default function ProfileCard({ user, address }: UserProp) {
  const router = useRouter();

  const form = useForm<z.infer<typeof PhoneSchema>>({
    resolver: zodResolver(PhoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

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
              {address.map((ad) => (
                <div key={ad.id}>
                  <p>{ad.street}</p>
                  <p>{ad.city}</p>
                  <p>{ad.state}</p>
                  <p>{ad.postalCode}</p>
                  <p>{ad.phoneNumber}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
