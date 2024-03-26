import { getAddress } from "@/actions/get-address";
import AddressForm from "@/components/address/address-form";

export default async function AddressPage() {
  const address = await getAddress();
  console.log(address);

  return (
    <div>
      {address.length === 0 ? (
        <div className="w-[600px] mx-auto p-6 space-y-4">
          <p className="text-center capitalize">
            Please input your valid Address
          </p>
          <AddressForm />
        </div>
      ) : (
        <div className="p-6">
          <table className="w-[600px] bg-red-400 mx-auto">
            {address.map((add) => (
              <tbody>
                <tr>
                  <td>Street: </td>
                  <td>{add.street}</td>
                </tr>
                <tr>
                  <td>City: </td>
                  <td>{add.city}</td>
                </tr>
                <tr>
                  <td>State: </td>
                  <td>{add.state}</td>
                </tr>
                <tr>
                  <td>Postal Code: </td>
                  <td>{add.postalCode}</td>
                </tr>
                <tr>
                  <td>Phone Number: </td>
                  <td>{add.phoneNumber}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
