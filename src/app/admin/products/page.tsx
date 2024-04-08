import { getCategories } from "@/actions/get-categories";
import { getProducts } from "@/actions/get-products";
import {
  getProductPagesPagination,
  getProductsPagination,
} from "@/actions/get-products-pagination";
import AddProductForm from "@/components/admin-product/add-product-form";
import DeleteProduct from "@/components/admin-product/delete-product";
import Pagination from "@/components/pagination/pagination";
import UpdateProductForm from "@/components/admin-product/update-product-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { IoMdEye } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default async function Products({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const itemPerPage = 4;

  const [products, categories, totalPages] = await Promise.all([
    getProductsPagination(currentPage, itemPerPage),
    getCategories(),
    getProductPagesPagination(itemPerPage),
  ]);

  return (
    <div className="w-full p-4">
      <h1>Product List</h1>
      {products.length < 1 ? (
        <div>
          <p className="font-semibold ">No products found</p>
        </div>
      ) : (
        <div>
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-slate-200">
              <tr>
                <th className="py-4 px-2">#</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Available Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="border-b">
                  <td className="py-3 px-2">{index + 1}</td>
                  <td>
                    {product.name.substring(0, 30)}
                    {product.name.length >= 30 && "..."}
                  </td>
                  <td>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                    />
                  </td>
                  {/* <td>
                    <p>
                      {product.description.substring(0, 50)}
                      {product.description.length >= 50 && "..."}
                    </p>
                  </td> */}
                  <td>{product.price}</td>

                  <td>
                    {product.inStock ? (
                      <div className="flex gap-2 items-center">
                        <FaCheckCircle size={16} className="text-teal-400" />
                        <p>In stock</p>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <FaTimesCircle size={20} className="text-rose-400" />
                        <p>Out of stock</p>
                      </div>
                    )}
                  </td>
                  <td className="flex items-center py-8 gap-1">
                    <Button asChild variant={"outline"} title="See detail">
                      <Link href={`/admin/products/${product.id}`}>
                        <IoMdEye size={20} />
                      </Link>
                    </Button>
                    <UpdateProductForm
                      categories={categories}
                      product={product}
                    />
                    <DeleteProduct product={product} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      )}

      <AddProductForm categories={categories} />
    </div>
  );
}
