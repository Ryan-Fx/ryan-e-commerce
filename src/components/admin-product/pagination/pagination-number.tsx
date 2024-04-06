import { cn } from "@/lib/utils";
import Link from "next/link";

export default function PaginationNumber({
  page,
  href,
  position,
  isActive,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = cn(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-sm": position === "first",
      "rounded-r-sm": position === "last",
      "rounded-sm": position === "single",
      "z-10 bg-blue-100 border-blue-500 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300 pointer-events-none": position === "middle",
    }
  );

  return isActive && position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}
