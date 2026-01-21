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
      <title>{seo.meta_title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords ? <meta name="keywords" content={seo.keywords} /> : null}
      {seo.canonical ? <link rel="canonical" href={seo.canonical} /> : null}
      <meta name="robots" content={seo.robots} />

      {/* Open Graph */}
      {seo.ogTitle ? <meta property="og:title" content={seo.ogTitle} /> : null}
      {seo.ogDescription ? <meta property="og:description" content={seo.ogDescription} /> : null}
      {seo.ogType ? <meta property="og:type" content={seo.ogType} /> : null}
      {seo.ogUrl ? <meta property="og:url" content={seo.ogUrl} /> : null}
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
      {seo.twitterCard ? <meta name="twitter:card" content={seo.twitterCard} /> : null}
      {seo.twitterTitle ? <meta name="twitter:title" content={seo.twitterTitle} /> : null}
      {seo.twitterDescription ? <meta name="twitter:description" content={seo.twitterDescription} /> : null}
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
