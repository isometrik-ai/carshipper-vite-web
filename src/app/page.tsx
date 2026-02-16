'use client';

import { useMemo } from "react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useLandingPage } from "@/api/landingPage";
import { usePageContentRenderer } from "@/utils/componentMapper";

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

/**
 * Landing/Home page component
 * 
 * Fetches page content from Strapi CMS and renders dynamic sections.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
export default function HomePage() {
  const { data, isLoading } = useLandingPage();

  // Extract page content components
  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);

  // Render page content components
  const renderedContent = usePageContentRenderer(pageContent);

  // Show loading state while fetching initial data
  if (isLoading && !data) {
    return <PageSkeleton />;
  }

  return <>{renderedContent}</>;
}

