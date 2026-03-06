import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useLandingPage } from "@/api/landingPage";
import { usePageContentRenderer } from "@/utils/componentMapper";

/**
 * Landing/Home page component
 * 
 * Fetches page content from Strapi CMS and renders dynamic sections.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const Index = () => {
  const { data, isLoading } = useLandingPage();

  // Extract page content components
  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);

  // Render page content components
  const renderedContent = usePageContentRenderer(pageContent);

  // Show loading state while fetching initial data
  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} pageContent={null} isMainPage={true} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1" role="main" aria-label="Main content">
            <PageSkeleton />
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO 
        seoMetadata={data?.data?.seo_metadata} 
        pageContent={pageContent}
        isMainPage={true}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1" role="main" aria-label="Main content">
          {renderedContent}
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </>
  );
};

export default Index;
