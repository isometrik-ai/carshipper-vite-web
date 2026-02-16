'use client';

import { useMemo } from "react";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { usePrivacy } from "@/api/privacy";
import type { PrivacySection } from "@/types/Privacy.types";

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

/**
 * Privacy Policy page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and policy sections.
 */
export default function Privacy() {
  const { data, isLoading } = usePrivacy();
  const pageData = data?.data;

  // Parse section content - extract paragraphs and bullet points
  const parseSectionContent = useMemo(() => {
    return (section: PrivacySection | undefined) => {
      if (!section || !section.paragraphs) {
        return { paragraphs: [], bulletPoints: [] };
      }

      const text = section.paragraphs;
      const hasStrapiBulletPoints = section.bullet_points && section.bullet_points.length > 0;
      
      if (hasStrapiBulletPoints) {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const paragraphs: string[] = [];
        const bulletPointsWithDescriptions: Array<{ label: string; description: string }> = [];
        
        section.bullet_points.forEach((bullet) => {
          const labelLower = bullet.text.toLowerCase();
          let description = '';
          
          if (labelLower.includes('carrier')) {
            description = lines.find(l => l.toLowerCase().includes('pickup') || l.toLowerCase().includes('delivery')) || '';
          } else if (labelLower.includes('service')) {
            description = lines.find(l => l.toLowerCase().includes('third-party') || l.toLowerCase().includes('payment')) || '';
          } else if (labelLower.includes('legal')) {
            description = lines.find(l => l.toLowerCase().includes('required by law') || l.toLowerCase().includes('disclose')) || '';
          }
          
          if (description) {
            bulletPointsWithDescriptions.push({ label: bullet.text, description });
          } else {
            bulletPointsWithDescriptions.push({ label: bullet.text, description: '' });
          }
        });
        
        const descriptionLines = bulletPointsWithDescriptions.map(bp => bp.description).filter(d => d.length > 0);
        lines.forEach(line => {
          const isDescription = descriptionLines.some(desc => desc === line || line.includes(desc.substring(0, 20)));
          if (!isDescription && line.length > 10) {
            paragraphs.push(line);
          }
        });
        
        return { paragraphs, bulletPoints: bulletPointsWithDescriptions };
      } else {
        const chunks = text.split('\n\n').map(c => c.trim()).filter(c => c.length > 0);
        const paragraphs: string[] = [];
        const bulletPoints: string[] = [];
        
        for (const chunk of chunks) {
          const lines = chunk.split('\n').map(l => l.trim()).filter(l => l.length > 0);
          
          const isBulletList = lines.length > 1 && lines.every(l => l.startsWith('-') || l.startsWith('•') || l.startsWith('*'));
          
          if (isBulletList) {
            bulletPoints.push(...lines.map(l => l.replace(/^[-•*]\s*/, '')));
          } else {
            const paragraphText = lines.join(' ');
            if (paragraphText.length > 0) {
              paragraphs.push(paragraphText);
            }
          }
        }
        
        return { paragraphs, bulletPoints };
      }
    };
  }, [pageData]);

  // Show loading state while fetching initial data
  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} />
        <PageSkeleton />
      </>
    );
  }

  if (!pageData) {
    return (
      <>
        <PageSEO seoMetadata={data?.data?.seo_metadata} />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">No content available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO seoMetadata={pageData.seo_metadata} />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h1>{pageData.page_title || "Privacy Policy"}</h1>
            {pageData.last_updated ? (
              <p className="text-muted-foreground">{pageData.last_updated}</p>
            ) : null}

            {pageData.sections && pageData.sections.length > 0 ? (
              pageData.sections.map((section) => {
                const { paragraphs, bulletPoints } = parseSectionContent(section);
                const hasStrapiBulletPoints = section.bullet_points && section.bullet_points.length > 0;
                
                return (
                  <div key={section.id}>
                    <h2>{section.section_heading}</h2>
                    
                    {paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                    
                    {hasStrapiBulletPoints && Array.isArray(bulletPoints) && bulletPoints.length > 0 && typeof bulletPoints[0] === 'object' ? (
                      <ul>
                        {(bulletPoints as Array<{ label: string; description: string }>).map((bullet, index) => (
                          <li key={section.bullet_points?.[index]?.id || index}>
                            <strong>{bullet.label}:</strong> {bullet.description}
                          </li>
                        ))}
                      </ul>
                    ) : Array.isArray(bulletPoints) && bulletPoints.length > 0 && typeof bulletPoints[0] === 'string' ? (
                      <ul>
                        {(bulletPoints as string[]).map((bullet, index) => (
                          <li key={index}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}

