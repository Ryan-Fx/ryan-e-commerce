import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled: boolean;
}) {
  const className = cn(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2": direction === "left",
      "ml-2": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <HiChevronLeft size={20} />
    ) : (
      <HiChevronRight size={20} />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link href={href} className={className}>
      {icon}
    </Link>
  );
}
