import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBiking,
  FaBox,
  FaHome,
  FaToolbox,
  FaUserFriends,
} from "react-icons/fa";

const links = [
  { name: "Dashboard", href: "/admin", icon: FaHome },
  { name: "Products", href: "/admin/products", icon: FaBox },
  { name: "Categories", href: "/admin/categories", icon: FaToolbox },
  { name: "Orders", href: "/admin/orders", icon: FaBiking },
  { name: "Customers", href: "/admin/customers", icon: FaUserFriends },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <Link
            href={link.href}
            key={link.name}
            className={cn(
              "flex space-x-4 font-semibold hover:bg-primary-foreground hover:text-primary p-2 rounded-md transition w-40",
              { "text-primary bg-primary-foreground": pathname === link.href }
            )}
          >
            <LinkIcon size={20} />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
