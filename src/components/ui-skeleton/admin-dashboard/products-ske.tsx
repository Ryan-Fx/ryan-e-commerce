import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsSke() {
  return (
    <div>
      <div className="p-4 space-y-3">
        <div>
          <Skeleton className="h-8 w-44" />
        </div>
        <div className="flex gap-5">
          <Skeleton className="w-[200px] h-[300px]" />
          <Skeleton className="w-[200px] h-[300px]" />
          <Skeleton className="w-[200px] h-[300px]" />
          <Skeleton className="w-[200px] h-[300px]" />
        </div>
      </div>
    </div>
  );
}
