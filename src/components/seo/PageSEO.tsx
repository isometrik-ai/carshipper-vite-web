'use client';

import { useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { SeoMetadata, PageContentComponent } from "@/types/LandingPage.types";
import { extractSeoMetadata, generateStructuredDataSchemas, type JsonLdSchema } from "@/utils/seo";

interface PageSEOProps {
  seoMetadata: SeoMetadata | null | undefined;
  pageContent?: PageContentComponent[] | null;
  isMainPage?: boolean;
}

/**
 * SEO component: meta tags, Open Graph, Twitter Card, and JSON-LD structured data (production-ready)
 * Note: For Next.js App Router, this uses client-side meta tag injection.
 * For better SEO, consider using metadata exports in page.tsx files.
 */
export const PageSEO = ({ seoMetadata, pageContent, isMainPage }: PageSEOProps) => {
  const seo = extractSeoMetadata(seoMetadata);
  const pathname = usePathname();
  const isHomePage = isMainPage ?? pathname === "/";

  const structuredDataSchemas = useMemo(
    () => generateStructuredDataSchemas(isHomePage, seoMetadata, pageContent),
    [isHomePage, seoMetadata, pageContent]
  );

  useEffect(() => {
    // Update document title
    if (seo.meta_title) {
      document.title = seo.meta_title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update meta tags
    if (seo.description) updateMetaTag('description', seo.description);
    if (seo.keywords) updateMetaTag('keywords', seo.keywords);
    if (seo.robots) updateMetaTag('robots', seo.robots);
    
    // Open Graph tags
    if (seo.ogTitle) updateMetaTag('og:title', seo.ogTitle, 'property');
    if (seo.ogDescription) updateMetaTag('og:description', seo.ogDescription, 'property');
    if (seo.ogType) updateMetaTag('og:type', seo.ogType, 'property');
    if (seo.ogUrl) updateMetaTag('og:url', seo.ogUrl, 'property');
    if (seo.ogImage) updateMetaTag('og:image', seo.ogImage, 'property');
    if (seo.ogImageWidth != null) updateMetaTag('og:image:width', String(seo.ogImageWidth), 'property');
    if (seo.ogImageHeight != null) updateMetaTag('og:image:height', String(seo.ogImageHeight), 'property');
    if (seo.ogImageAlt) updateMetaTag('og:image:alt', seo.ogImageAlt, 'property');

    // Twitter tags
    if (seo.twitterCard) updateMetaTag('twitter:card', seo.twitterCard);
    if (seo.twitterTitle) updateMetaTag('twitter:title', seo.twitterTitle);
    if (seo.twitterDescription) updateMetaTag('twitter:description', seo.twitterDescription);
    if (seo.twitterImage) updateMetaTag('twitter:image', seo.twitterImage);

    // Update canonical link
    if (seo.canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', seo.canonical);
    }

    // Remove existing JSON-LD scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add JSON-LD structured data
    structuredDataSchemas.forEach((schema: JsonLdSchema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `ld+json-${index}`;
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    if (seo.structuredData != null && structuredDataSchemas.length === 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(seo.structuredData);
      document.head.appendChild(script);
    }
  }, [seo, structuredDataSchemas]);

  // This component doesn't render anything
  return null;
};
