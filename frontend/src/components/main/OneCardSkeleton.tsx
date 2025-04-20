import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const OneCardSkeleton = () => {
  return (
    <Card className="w-full p-[10px] shadow-xl rounded-2xl border border-gray-200">
      <CardContent className="p-0 space-y-2">
        <Skeleton className="h-40 w-full rounded-lg" />
        <div className="relative space-y-2 px-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/4" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
