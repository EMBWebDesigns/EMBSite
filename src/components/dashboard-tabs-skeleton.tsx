import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const DashboardTabsSkeleton = () => {
  return (
    <div>
      <div className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  );
};