import type { Metadata } from "next";
import { generatePageMetadata, fetchSeoMetadata } from "@/utils/metadata";
import TrackPageClient from "./TrackPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchSeoMetadata("/api/track-shipment");
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "Track Your Car Shipment | CarShippers.ai",
    "Track your car shipment in real-time. Enter your tracking number or VIN to get status updates. Door-to-door auto transport tracking."
  );
}

export const dynamic = "force-dynamic";

export default function TrackPage() {
  return <TrackPageClient />;
}
