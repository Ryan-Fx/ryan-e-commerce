import React from "react";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <div className="w-[700px] mx-auto relative">
      <Input placeholder="Searh item in Ryan Mall" className="pl-10" />{" "}
      <IoSearch size={20} className="absolute top-3 left-3 " />
    </div>
  );
}
