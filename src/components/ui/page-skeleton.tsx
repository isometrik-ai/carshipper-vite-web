import { Skeleton } from "@/components/ui/skeleton";

/**
 * Generic page skeleton component for loading states
 * Provides a consistent loading experience across all pages
 */
export const PageSkeleton = () => {
  return (
    <div className="w-full space-y-8 py-8" role="status" aria-label="Loading page content">
      {/* Hero Section Skeleton */}
      <section className="container mx-auto px-4 space-y-4">
        <Skeleton className="h-16 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-10 w-48 mx-auto" />
      </section>

      {/* Content Sections Skeleton */}
      <section className="container mx-auto px-4 space-y-6">
        <Skeleton className="h-8 w-2/3" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </section>

      {/* Cards/Grid Skeleton */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </section>

      {/* Additional Content Skeleton */}
      <section className="container mx-auto px-4 space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </section>
    </div>
  );
};
