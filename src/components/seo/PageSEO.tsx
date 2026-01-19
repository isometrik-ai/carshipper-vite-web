import { Helmet } from "react-helmet-async";
import type { SeoMetadata } from "@/types/LandingPage.types";
import { extractSeoMetadata } from "@/utils/seo";

interface PageSEOProps {
  seoMetadata: SeoMetadata | null | undefined;
}

/**
 * SEO component that handles all meta tags, Open Graph, Twitter Card, and structured data
 */
export const PageSEO = ({ seoMetadata }: PageSEOProps) => {
  const seo = extractSeoMetadata(seoMetadata);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords ? <meta name="keywords" content={seo.keywords} /> : null}
      <link rel="canonical" href={seo.canonical} />
      <meta name="robots" content={seo.robots} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:type" content={seo.ogType} />
      <meta property="og:url" content={seo.ogUrl} />
      {seo.ogImage ? <meta property="og:image" content={seo.ogImage} /> : null}
      {seo.ogImageWidth ? (
        <meta property="og:image:width" content={seo.ogImageWidth.toString()} />
      ) : null}
      {seo.ogImageHeight ? (
        <meta property="og:image:height" content={seo.ogImageHeight.toString()} />
      ) : null}
      {seo.ogImageAlt ? (
        <meta property="og:image:alt" content={seo.ogImageAlt} />
      ) : null}

      {/* Twitter Card */}
      <meta name="twitter:card" content={seo.twitterCard} />
      <meta name="twitter:title" content={seo.twitterTitle} />
      <meta name="twitter:description" content={seo.twitterDescription} />
      {seo.twitterImage ? <meta name="twitter:image" content={seo.twitterImage} /> : null}

      {/* Structured Data (JSON-LD) */}
      {seo.structuredData ? (
        <script type="application/ld+json">
          {JSON.stringify(seo.structuredData)}
        </script>
      ) : null}
    </Helmet>
  );
};
