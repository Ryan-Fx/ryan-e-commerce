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
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "../uploadthing/uploadthing";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Category, Product } from "@prisma/client";
import axios from "axios";
import { RxPencil2 } from "react-icons/rx";

const UpdateProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price is required"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().min(1, "Image is required"),
});

interface UpdateProductProps {
  product: Product;
  categories: Category[];
}

export default function UpdateProductForm({
  product,
  categories,
}: UpdateProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | undefined>(product?.image);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingImg, setDeletingImg] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateProductFormSchema>>({
    resolver: zodResolver(UpdateProductFormSchema),
    defaultValues: product || {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      image: "",
    },
  });

  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("image", image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image]);

  function handleDelete(image: string) {
    setDeletingImg(true);
    const imgKey = image.substring(image.lastIndexOf("/") + 1);
    axios
      .post("/api/uploadthing/delete", { imgKey })
      .then((res) => {
        if (res.data.success) {
          toast.success("Image deleted successfully");
          setImage("");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => setDeletingImg(false));
  }

  function onSubmit(data: z.infer<typeof UpdateProductFormSchema>) {
    setIsLoading(true);
    axios
      .patch(`/api/product/${product.id}`, data)
      .then((res) => {
        setIsLoading(false);
        toast.success("Product updated successfully");
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
          <Button variant={"ghost"}>
            <RxPencil2 size={20} title="Update" className="text-blue-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90%] max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>
              Update{" "}
              <span className="text-teal-500 font-semibold capitalize">
                {product.name}
              </span>
              . Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[75vh] overflow-y-auto p-4">
            <Form {...form}>
              <form
                action=""
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price *</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Delete this image first if you want to change it
                      </FormLabel>
                      <FormControl>
                        {image ? (
                          <>
                            <div className="w-[500px] h-[400px] mx-auto rounded-md relative">
                              <Image
                                fill
                                src={image}
                                alt="product image"
                                className="object-contain"
                              />
                              <Button
                                title="Delete this image first to change it"
                                disabled={deletingImg}
                                type="button"
                                size={"icon"}
                                onClick={() => handleDelete(image)}
                                variant={"ghost"}
                                className="absolute top-0 right-0"
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="border p-4 rounded-md">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  console.log("Files: ", res);
                                  setImage(res[0].url);
                                  toast.success("Upload Completed");
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  toast.error(`ERROR! ${error.message}`);
                                }}
                              />
                            </div>
                          </>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />{" "}
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
