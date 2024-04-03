import { getCategories } from "@/actions/get-categories";
import AddCategoryForm from "@/components/admin-category/add-category-form";
import DeleteCategory from "@/components/admin-category/delete-category";
import UpdateCategory from "@/components/admin-category/update-category";
import React from "react";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="w-full">
      <p>Categories List</p>
      <div>
        <table className="w-full text-left">
          <thead className="bg-slate-200">
            <tr>
              <th className="py-4 px-2">#</th>
              <th>Category Name</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} className="border-b">
                <td className="py-3 px-2 ">{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.createdAt.toDateString()}</td>
                <td className="flex gap-2 items-center p-2">
                  <UpdateCategory category={category} />
                  <DeleteCategory category={category} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <AddCategoryForm />
      </div>
    </div>
  );
}
