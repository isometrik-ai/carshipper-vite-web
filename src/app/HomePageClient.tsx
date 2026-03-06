"use client";

import { useMemo } from "react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useLandingPage } from "@/api/landingPage";
import { usePageContentRenderer } from "@/utils/componentMapper";

/**
 * Client component for the home page - handles data fetching and interactive content
 */
export default function HomePageClient() {
  const { data, isLoading } = useLandingPage();

  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);

  const renderedContent = usePageContentRenderer(pageContent);

  if (isLoading && !data) {
    return <PageSkeleton />;
  }

  return <>{renderedContent}</>;
}
