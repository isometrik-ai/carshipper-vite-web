import BookingPage from "@/containers/BookingPage";
import { Suspense } from "react";
import Loader from "@/components/ui/loader/loader";
export const dynamic = 'force-dynamic';

function Loading() {
  return <div className="flex h-screen items-center justify-center">
      <Loader />
      Loading Booking Details...
    </div>;
}

export default function Page({ 
  params, 
  searchParams 
}: { 
  params: { quoteId: string };
  searchParams: { tier?: string };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <BookingPage 
        quoteId={params?.quoteId} 
        initialTier={searchParams?.tier as "saver" | "priority" | "rush" | undefined}
      />
    </Suspense>
  );
}