import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import type { SeoMetadata, PageContentComponent } from "@/types/LandingPage.types";
import { extractSeoMetadata, generateStructuredDataSchemas, type JsonLdSchema } from "@/utils/seo";

interface PageSEOProps {
  seoMetadata: SeoMetadata | null | undefined;
  pageContent?: PageContentComponent[] | null;
  isMainPage?: boolean;
}

/**
 * SEO component: meta tags, Open Graph, Twitter Card, and JSON-LD structured data (production-ready)
 */
export const PageSEO = ({ seoMetadata, pageContent, isMainPage }: PageSEOProps) => {
  const seo = extractSeoMetadata(seoMetadata);
  const location = useLocation();
  const isHomePage = isMainPage ?? location.pathname === "/";

  const structuredDataSchemas = useMemo(
    () => generateStructuredDataSchemas(isHomePage, seoMetadata, pageContent),
    [isHomePage, seoMetadata, pageContent]
  );

  return (
    <Helmet>
      <title>{seo.meta_title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords ? <meta name="keywords" content={seo.keywords} /> : null}
      {seo.canonical ? <link rel="canonical" href={seo.canonical} /> : null}
      <meta name="robots" content={seo.robots} />

      {seo.ogTitle ? <meta property="og:title" content={seo.ogTitle} /> : null}
      {seo.ogDescription ? <meta property="og:description" content={seo.ogDescription} /> : null}
      {seo.ogType ? <meta property="og:type" content={seo.ogType} /> : null}
      {seo.ogUrl ? <meta property="og:url" content={seo.ogUrl} /> : null}
      {seo.ogImage ? <meta property="og:image" content={seo.ogImage} /> : null}
      {seo.ogImageWidth != null ? (
        <meta property="og:image:width" content={String(seo.ogImageWidth)} />
      ) : null}
      {seo.ogImageHeight != null ? (
        <meta property="og:image:height" content={String(seo.ogImageHeight)} />
      ) : null}
      {seo.ogImageAlt ? <meta property="og:image:alt" content={seo.ogImageAlt} /> : null}

      {seo.twitterCard ? <meta name="twitter:card" content={seo.twitterCard} /> : null}
      {seo.twitterTitle ? <meta name="twitter:title" content={seo.twitterTitle} /> : null}
      {seo.twitterDescription ? (
        <meta name="twitter:description" content={seo.twitterDescription} />
      ) : null}
      {seo.twitterImage ? <meta name="twitter:image" content={seo.twitterImage} /> : null}

      {structuredDataSchemas.map((schema: JsonLdSchema, index) => {
        const type = (schema["@type"] as string) ?? "Schema";
        return (
          <script key={`ld+json-${type}-${index}`} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        );
      })}

      {seo.structuredData != null && structuredDataSchemas.length === 0 && (
        <script type="application/ld+json">{JSON.stringify(seo.structuredData)}</script>
      )}
    </Helmet>
  );
};
