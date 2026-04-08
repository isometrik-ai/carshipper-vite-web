import Loader from "@/components/ui/loader/loader";

/** Shared loading shell for /book/[quoteId] (route loading + dynamic import). */
export default function BookingPageLoading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 py-12">
      <Loader />
      <p className="text-sm text-muted-foreground">Loading booking details…</p>
    </div>
  );
}
