import { Skeleton } from "@/components/ui/skeleton";

export default function LatestOrdersSke() {
  return (
    <div className="w-[330px] space-y-4 p-2">
      <div>
        <Skeleton className="h-11 w-[240px]" />
      </div>
      <div className="flex justify-between">
        <div>
          <div className="space-y-4">
            <Skeleton className="h-14 w-[280px]" />
            <Skeleton className="h-14 w-[280px]" />
            <Skeleton className="h-14 w-[280px]" />
            <Skeleton className="h-14 w-[280px]" />
            <Skeleton className="h-14 w-[280px]" />
          </div>
        </div>
        <div>right</div>
      </div>
    </div>
  );
}
