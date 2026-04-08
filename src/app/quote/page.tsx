import QuotePageClient from "./QuotePageClient";
import { getQuotePageData } from "@/lib/quotePage.server";

export const revalidate = 60;

export default async function QuotePage() {
  const initialData = await getQuotePageData();
  return <QuotePageClient initialData={initialData} />;
}
