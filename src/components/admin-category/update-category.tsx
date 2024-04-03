"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Category } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RxPencil2 } from "react-icons/rx";

const UpdateCategoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

interface CategoryProps {
  category: Category;
}

export default function UpdateCategory({ category }: CategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateCategoryFormSchema>>({
    resolver: zodResolver(UpdateCategoryFormSchema),
    defaultValues: category || {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof UpdateCategoryFormSchema>) {
    setIsLoading(true);

    axios
      .patch(`/api/category/${category.id}`, data)
      .then((res) => {
        setIsLoading(false);
        toast.success("Category updated successfully");
        setIsOpen(false);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Something went wrong");
      });
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} title="Update">
            <RxPencil2 size={20} className="text-blue-500" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Categories</DialogTitle>
            <DialogDescription>
              Add a category here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Form {...form}>
              <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-4 space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name *</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Updating
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
