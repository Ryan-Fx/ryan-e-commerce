"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Address } from "@prisma/client";

const AddressFormSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

export default function AddressForm({
  address,
}: {
  address: Address | null | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();

  const form = useForm<z.infer<typeof AddressFormSchema>>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: address || {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      phoneNumber: "",
    },
  });

  function onSubmit(data: z.infer<typeof AddressFormSchema>) {
    setIsLoading(true);

    if (!address) {
      axios
        .post("/api/address", data)
        .then((res) => {
          setIsLoading(false);
          toast.success("Address added successfully");
          form.reset();
          router.refresh();
          router.push("/product");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          toast.error("Something went wrong");
        });
      axios
        .post("/api/address", data)
        .then((res) => {
          setIsLoading(false);
          toast.success("Address added successfully");
          form.reset();
          router.refresh();
          router.push("/product");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          toast.error("Something went wrong");
        });
    } else {
      axios
        .patch(`/api/address/${address.id}`, data)
        .then((res) => {
          setIsLoading(false);
          toast.success('"Address updated successfully"');
          router.refresh();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          toast.error("Something went wrong");
        });
    }
  }

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 p-10 border rounded-sm"
      >
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street *</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City *</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State *</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code *</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number *</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Saving
            </>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
}
