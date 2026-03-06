import type { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import HomePageClient from "./HomePageClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

async function getLandingPageData() {
  try {
    const res = await fetch(
      `${API_URL}/api/landing-page?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLandingPageData();
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "CarShippers.ai | Ship Your Car in 30 Seconds | Instant Auto Transport Quotes",
    "Get an instant car shipping quote in 30 seconds. Licensed carriers, door-to-door service, no hidden fees. Ship your car anywhere in the US with CarShippers.ai."
  );
}

export default function HomePage() {
  return <HomePageClient />;
}
