"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Product } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { BsTrash } from "react-icons/bs";

interface ProductProps {
  product: Product;
}

export default function DeleteProduct({ product }: ProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const onProductDelete = async (product: Product) => {
    setIsDeleting(true);
    const getImgKey = (src: string) => src.substring(src.lastIndexOf("/") + 1);

    try {
      const imgKey = getImgKey(product.image);
      await axios.post("/api/uploadthing/delete", { imgKey });
      await axios.delete(`/api/product/${product.id}`);

      setIsDeleting(false);
      toast.success("Product deleted successfully");
      router.refresh();
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
      setIsDeleting(false);
      toast.error(`failed to delete product: ${error.message}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant={"outline"} type="button" title="Delete">
            <BsTrash size={20} className="text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure want to delete{" "}
              <span className="capitalize text-teal-500 font-semibold">
                {product.name}
              </span>
              ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              data from database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              type="button"
              disabled={isDeleting}
              onClick={() => onProductDelete(product)}
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Deleting
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
