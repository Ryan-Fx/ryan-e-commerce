import { getCustomers } from "@/actions/get-customers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoMdEye } from "react-icons/io";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="w-full p-4 space-y-6">
      <h1>Costumers List</h1>
      <div>
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="bg-slate-100">
            <tr>
              <th className="py-4 px-2">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          {customers.map((customer, index) => (
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-2">{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                  <Button asChild variant={"ghost"}>
                    <Link href={`/admin/customers/${customer.id}`}>
                      <IoMdEye size={20} className="mr-2" />
                      Order History
                    </Link>
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
