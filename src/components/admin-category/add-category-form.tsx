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
import { Input } from "../ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const CategoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export default function AddCategoryForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof CategoryFormSchema>) {
    setIsLoading(true);

    axios
      .post("/api/category", data)
      .then((res) => {
        toast.success("Category added succesfully!");
        form.reset();
        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong! Or category name already exists!");
        setIsLoading(false);
      });
  }

  return (
    <div className="p-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Add Category</Button>
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
                      Saving
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
