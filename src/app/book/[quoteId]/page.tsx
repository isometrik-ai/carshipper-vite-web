import type { Metadata } from "next";
import dynamic from "next/dynamic";
import BookingPageLoading from "@/components/booking/BookingPageLoading";

const BookingPage = dynamic(() => import("@/containers/BookingPage"), {
  ssr: false,
  loading: () => <BookingPageLoading />,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://carshippers.ai";

export async function generateMetadata({
  params,
}: {
  params: { quoteId: string };
}): Promise<Metadata> {
  const safeQuoteId = encodeURIComponent(params?.quoteId || "");
  const title = `Complete Booking | Quote ${params?.quoteId || ""}`.trim();
  const description =
    "Complete your car shipping booking, verify details, and confirm your transport plan.";
  const canonical = `${SITE_URL}/book/${safeQuoteId}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function Page({ 
  params, 
  searchParams 
}: { 
  params: { quoteId: string };
  searchParams: { tier?: string };
}) {
  return (
    <BookingPage 
      quoteId={params?.quoteId} 
      initialTier={searchParams?.tier as "saver" | "priority" | "rush" | undefined}
    />
  );
}