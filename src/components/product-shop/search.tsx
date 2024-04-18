"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((e: string) => {
    console.log(e);
    const params = new URLSearchParams(searchParams);

    if (e) {
      params.set("query", e);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="w-[700px] mx-auto relative">
      <Input
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        placeholder="Searh item in Ryan Store"
        className="pl-10"
      />{" "}
      <IoSearch size={20} className="absolute top-3 left-3 " />
    </div>
  );
}
