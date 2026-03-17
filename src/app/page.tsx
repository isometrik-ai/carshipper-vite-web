'use client';

import { useEffect, useMemo } from "react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useLandingPage } from "@/api/landingPage";
import { usePageContentRenderer } from "@/utils/componentMapper";
import { getAllActivePricingRulesList } from "@/services/pricing-services";
// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

/**
 * Landing/Home page component
 * 
 * Fetches page content from Strapi CMS and renders dynamic sections.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
export default function HomePage() {
  const { data, isLoading, isError, error, refetch } = useLandingPage();
  const pageContent = useMemo(() => data?.data?.page_content || [], [data]);
  const renderedContent = usePageContentRenderer(pageContent);

  useEffect(() => {
    getAllActivePricingRulesList("");
  }, []);

  if (isLoading && !data) {
    return (
      <>
        <PageSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-destructive font-medium">Unable to load the page.</p>
        <p className="text-muted-foreground text-sm">{error?.message ?? "Please try again."}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Retry
        </button>
      </div>
    );
  }

  return <>{renderedContent}</>;
}

