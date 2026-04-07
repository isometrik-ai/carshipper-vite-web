'use client';

import { useMemo } from "react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useLandingPage } from "@/api/landingPage";
import { usePageContentRenderer } from "@/utils/componentMapper";
import type { LandingPageResponse } from "@/types/LandingPage.types";

type HomePageClientProps = {
  initialData?: LandingPageResponse;
};

export default function HomePageClient({ initialData }: HomePageClientProps) {
  const { data, isLoading, isError, error } = useLandingPage(initialData);
  const pageContent = useMemo(() => data?.data?.page_content || [], [data]);
  const renderedContent = usePageContentRenderer(pageContent);

  if (isLoading && !data) {
    return <PageSkeleton />;
  }

  if (isError && error) {
    throw error;
  }

  return <>{renderedContent}</>;
}

