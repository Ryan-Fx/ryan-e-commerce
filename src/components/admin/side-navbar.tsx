"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NavLinks from "./nav-links";

export default function SideNavbar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen w-[310px] text-primary-foreground col-span-3 ">
      <div
        className={cn(
          "w-full h-screen bg-primary p-4 transition duration-300 relative",
          isOpen ? "translate-x-0" : "-translate-x-[182px]"
        )}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-3 right-3"
        >
          {isOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
        </Button>
        <div className="space-y-3 mt-12">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
