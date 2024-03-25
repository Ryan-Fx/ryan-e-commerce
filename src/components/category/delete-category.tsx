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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface CategoryProps {
  category: Category;
}

export default function DeleteCategory({ category }: CategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const onCategoryDelete = async (category: Category) => {
    setIsDeleting(true);

    try {
      await axios.delete(`/api/category/${category.id}`);

      setIsDeleting(false);
      toast.success("Category deleted successfully");
      router.refresh();
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
      setIsDeleting(false);
      toast.error(`failed to delete category: ${error.message}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} type="button">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure want to delete{" "}
              <span className="capitalize text-teal-500 font-semibold">
                {category.name}
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
              onClick={() => onCategoryDelete(category)}
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
