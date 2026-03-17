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
  const { data, isLoading, isError, error } = useLandingPage();
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

  if (isError && error) {
    throw error;
  }

  return <>{renderedContent}</>;
}

