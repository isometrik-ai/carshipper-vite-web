import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNotFound } from "@/api/notFound";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/seo/PageSEO";
import { LoadingState } from "@/components/landing/LoadingState";
import { Button } from "@/components/ui/button";

/**
 * 404 Not Found page component
 * 
 * Fetches page content from Strapi CMS and renders 404 error page.
 * All content is managed through Strapi, including SEO metadata.
 */
const NotFound = () => {
  const location = useLocation();
  const { data, isLoading, error } = useNotFound();

  // Existing effect for logging 404 errors
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Show loading state while fetching initial data
  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1" role="main" aria-label="Main content">
            <LoadingState />
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const notFoundData = data?.data;

  return (
    <>
      <PageSEO seoMetadata={notFoundData?.seo_metadata} />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20" role="main" aria-label="404 Not Found page">
          <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-muted/30" aria-labelledby="not-found-heading">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto">
                {/* Dynamic Status Code (e.g., 404) - This is the ONLY H1 on the page */}
                <h1 id="not-found-heading" className="mb-4 text-6xl md:text-8xl font-bold text-primary">
                  {notFoundData?.status_code || "404"}
                </h1>

                {/* Dynamic Status Message */}
                <p className="mb-8 text-xl md:text-2xl text-muted-foreground">
                  {notFoundData?.status_message || "Oops! Page not found"}
                </p>

                {/* Dynamic Home Link */}
                <Button
                  asChild
                  variant="hero"
                  size="lg"
                  className="text-lg px-8"
                >
                  <a href={notFoundData?.home_link?.href || "/"}>
                    {notFoundData?.home_link?.label || "Return to Home"}
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;