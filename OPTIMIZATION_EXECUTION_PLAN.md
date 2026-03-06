# Optimization Execution Plan

## 📋 Overview

This document provides a step-by-step execution plan for optimizing the Next.js application before API integration. Each task includes detailed instructions, code examples, and testing steps.

---

## 🎯 Phase 1: Critical Optimizations (Do First)

### Task 1: Migrate SEO to Next.js Metadata API

**Priority:** ⚠️ CRITICAL  
**Estimated Time:** 2-3 hours  
**Impact:** ⭐⭐⭐⭐⭐ (SEO), ⭐⭐⭐ (Performance)

#### Step 1.1: Create SEO Utility Functions

**File:** `src/utils/metadata.ts` (NEW)

```typescript
import type { Metadata } from "next";
import type { SeoMetadata } from "@/types/LandingPage.types";

/**
 * Extract and format SEO metadata for Next.js Metadata API
 */
export function generatePageMetadata(
  seoMetadata: SeoMetadata | null | undefined,
  defaultTitle?: string,
  defaultDescription?: string
): Metadata {
  const seo = seoMetadata || {};
  
  const title = seo.meta_title || defaultTitle || "CarShippers.ai";
  const description = seo.meta_description || defaultDescription || "Ship your car anywhere in the US";
  const keywords = seo.meta_keywords || "";
  const canonical = seo.canonical_url || "";
  const ogImage = seo.og_image?.url 
    ? `${process.env.NEXT_PUBLIC_API_URL}${seo.og_image.url}`
    : undefined;

  return {
    title,
    description,
    keywords: keywords ? keywords.split(",").map(k => k.trim()) : undefined,
    alternates: {
      canonical: canonical || undefined,
    },
    openGraph: {
      title: seo.og_title || title,
      description: seo.og_description || description,
      type: seo.og_type || "website",
      url: seo.og_url || canonical,
      images: ogImage ? [
        {
          url: ogImage,
          width: seo.og_image?.width || 1200,
          height: seo.og_image?.height || 630,
          alt: seo.og_image?.alternativeText || title,
        }
      ] : undefined,
    },
    twitter: {
      card: seo.twitter_card || "summary_large_image",
      title: seo.twitter_title || title,
      description: seo.twitter_description || description,
      images: seo.twitter_image?.url 
        ? [`${process.env.NEXT_PUBLIC_API_URL}${seo.twitter_image.url}`]
        : undefined,
    },
    robots: {
      index: seo.robots?.index !== false,
      follow: seo.robots?.follow !== false,
      googleBot: {
        index: seo.robots?.index !== false,
        follow: seo.robots?.follow !== false,
      },
    },
  };
}

/**
 * Generate JSON-LD structured data
 */
export function generateStructuredData(
  seoMetadata: SeoMetadata | null | undefined,
  pageType: "WebPage" | "Organization" | "Service" = "WebPage"
) {
  // Return structured data object for JSON-LD
  // Implementation based on your existing seo.ts utility
  return null; // Placeholder - implement based on existing logic
}
```

#### Step 1.2: Update Home Page (page.tsx)

**File:** `src/app/page.tsx`

**Before:**
```typescript
'use client';
import { PageSEO } from "@/components/seo/PageSEO";
// ... rest of code
```

**After:**
```typescript
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import HomePageClient from "./HomePageClient";

// Fetch data on server for metadata
async function getLandingPageData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/landing-page?populate=deep`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const data = await getLandingPageData();
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "CarShippers.ai | Ship Your Car in 30 Seconds",
    "Get an instant car shipping quote in 30 seconds. Licensed carriers, door-to-door service, no hidden fees."
  );
}

// Client component for interactive parts
export default function HomePage() {
  return <HomePageClient />;
}
```

**File:** `src/app/HomePageClient.tsx` (NEW)

```typescript
'use client';

import { useMemo } from "react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useLandingPage } from "@/api/landingPage";
import { usePageContentRenderer } from "@/utils/componentMapper";

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
```

#### Step 1.3: Update All Other Pages

**Pattern for each page:**

1. Create `generateMetadata` function (server-side)
2. Move client logic to separate client component
3. Remove `PageSEO` component usage
4. Keep JSON-LD in client component if needed (or move to layout)

**Example for About Page:**

**File:** `src/app/about/page.tsx`

```typescript
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import AboutPageClient from "./AboutPageClient";

async function getAboutPageData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/about-page?populate=deep`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPageData();
  return generatePageMetadata(
    data?.data?.seo_metadata,
    "About Us | CarShippers.ai",
    "Learn about CarShippers.ai and our mission to make car shipping simple and affordable."
  );
}

export default function AboutPage() {
  return <AboutPageClient />;
}
```

**File:** `src/app/about/AboutPageClient.tsx` (NEW)

Move all existing client logic here, remove `PageSEO` usage.

#### Step 1.4: Testing Checklist

- [ ] Verify metadata appears in HTML `<head>` (View Page Source)
- [ ] Test Open Graph tags with Facebook Debugger
- [ ] Test Twitter Card with Twitter Card Validator
- [ ] Verify canonical URLs are correct
- [ ] Check robots meta tags
- [ ] Test all 23 pages

#### Step 1.5: Remove Old SEO Component (After Migration)

**File:** `src/components/seo/PageSEO.tsx` - Can be deleted or kept for JSON-LD only

---

### Task 2: Image Optimization with Next.js Image Component

**Priority:** ⚠️ CRITICAL  
**Estimated Time:** 2-3 hours  
**Impact:** ⭐⭐⭐⭐⭐ (Performance)

#### Step 2.1: Update HeroSection Component

**File:** `src/components/sections/HeroSection.tsx`

**Before:**
```typescript
{backgroundImageUrl ? (
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    role="img"
    aria-label={heroData.backgroundImage?.alternativeText || "Car shipping background"}
  />
) : (
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(/hero-bg.jpg)` }}
    role="img"
    aria-label="Car shipping background"
  />
)}
```

**After:**
```typescript
import Image from "next/image";

{backgroundImageUrl ? (
  <Image
    src={backgroundImageUrl}
    alt={heroData.backgroundImage?.alternativeText || "Car shipping background"}
    fill
    priority
    className="object-cover"
    sizes="100vw"
    quality={90}
  />
) : (
  <Image
    src="/hero-bg.jpg"
    alt="Car shipping background"
    fill
    priority
    className="object-cover"
    sizes="100vw"
    quality={90}
  />
)}
```

**Update parent container:**
```typescript
<section 
  className={`relative ${showQuoteForm ? "min-h-screen pt-20" : "py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background"}`}
  aria-label="Hero section"
>
  {/* Background Image Container */}
  {showQuoteForm && (
    <div className="absolute inset-0 -z-10">
      {/* Image component here */}
    </div>
  )}
  {/* Rest of content */}
</section>
```

#### Step 2.2: Find and Replace All Image Usage

**Search for:**
- `<img` tags
- `backgroundImage` in style attributes
- `url()` in CSS

**Replace with:**
- `next/image` component
- Proper `fill` or `width/height` props
- `priority` for above-the-fold images
- `loading="lazy"` for below-the-fold images

#### Step 2.3: Update next.config.js for Production Images

**File:** `next.config.js`

```javascript
images: {
  domains: ['localhost'],
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '1337',
      pathname: '/uploads/**',
    },
    // Add production Strapi domain
    {
      protocol: 'https',
      hostname: 'your-strapi-domain.com',
      pathname: '/uploads/**',
    },
  ],
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
},
```

#### Step 2.4: Testing Checklist

- [ ] Verify images load correctly
- [ ] Check Network tab for WebP/AVIF format
- [ ] Test responsive images (different viewport sizes)
- [ ] Verify lazy loading works
- [ ] Check Core Web Vitals (LCP improvement)
- [ ] Test on slow 3G connection

---

### Task 3: Add API Error Handling

**Priority:** ⚠️ CRITICAL  
**Estimated Time:** 1-2 hours  
**Impact:** ⭐⭐⭐⭐ (Reliability)

#### Step 3.1: Create Enhanced API Client

**File:** `src/api/client.ts`

**Before:**
```typescript
export async function apiGet(endpoint: string) {
    const res = await fetch(`${API_URL}/api/${endpoint}`);
    return res.json();
}
```

**After:**
```typescript
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ApiError {
  message: string;
  status: number;
  endpoint: string;
}

export class ApiClientError extends Error {
  status: number;
  endpoint: string;

  constructor(message: string, status: number, endpoint: string) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.endpoint = endpoint;
  }
}

const DEFAULT_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 2;

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = DEFAULT_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiClientError('Request timeout', 408, url);
    }
    throw error;
  }
}

async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = MAX_RETRIES
): Promise<Response> {
  let lastError: Error | null = null;

  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetchWithTimeout(url, options);
      
      if (!response.ok) {
        // Don't retry on 4xx errors (client errors)
        if (response.status >= 400 && response.status < 500) {
          throw new ApiClientError(
            `API error: ${response.statusText}`,
            response.status,
            url
          );
        }
        // Retry on 5xx errors (server errors)
        if (i < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }
        throw new ApiClientError(
          `API error: ${response.statusText}`,
          response.status,
          url
        );
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      // Don't retry on timeout or client errors
      if (error instanceof ApiClientError && error.status < 500) {
        throw error;
      }
      // Retry on network errors or server errors
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
    }
  }

  throw lastError || new ApiClientError('Unknown error', 500, url);
}

export async function apiGet<T = any>(
  endpoint: string,
  options: {
    timeout?: number;
    retries?: number;
    next?: { revalidate?: number };
  } = {}
): Promise<T> {
  if (!API_URL) {
    throw new ApiClientError('API_URL is not configured', 500, endpoint);
  }

  const url = `${API_URL}/api/${endpoint}`;
  
  try {
    const response = await fetchWithRetry(
      url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: options.next,
      },
      options.retries
    );

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    throw new ApiClientError(
      error instanceof Error ? error.message : 'Network error',
      0,
      endpoint
    );
  }
}

export async function apiPost<T = any>(
  endpoint: string,
  body: any,
  options: {
    timeout?: number;
    retries?: number;
  } = {}
): Promise<T> {
  if (!API_URL) {
    throw new ApiClientError('API_URL is not configured', 500, endpoint);
  }

  const url = `${API_URL}/api/${endpoint}`;
  
  try {
    const response = await fetchWithRetry(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
      options.retries
    );

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    throw new ApiClientError(
      error instanceof Error ? error.message : 'Network error',
      0,
      endpoint
    );
  }
}
```

#### Step 3.2: Update API Hooks to Handle Errors

**File:** `src/api/landingPage.ts` (Example)

**Before:**
```typescript
export function useLandingPage() {
  return useQuery({
    queryKey: ["landing-page"],
    queryFn: () => apiGet("landing-page?populate=deep"),
  });
}
```

**After:**
```typescript
import { useQuery } from "@tanstack/react-query";
import { apiGet, ApiClientError } from "./client";

export function useLandingPage() {
  return useQuery({
    queryKey: ["landing-page"],
    queryFn: async () => {
      try {
        return await apiGet("landing-page?populate=deep");
      } catch (error) {
        if (error instanceof ApiClientError) {
          console.error(`API Error [${error.status}]: ${error.message}`, {
            endpoint: error.endpoint,
          });
        }
        throw error;
      }
    },
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (error instanceof ApiClientError && error.status >= 400 && error.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
```

#### Step 3.3: Add Error Boundary Component

**File:** `src/components/ErrorBoundary.tsx` (NEW)

```typescript
'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-lg border bg-card p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

#### Step 3.4: Testing Checklist

- [ ] Test with invalid API URL
- [ ] Test with network timeout
- [ ] Test with 404 error
- [ ] Test with 500 error
- [ ] Verify retry logic works
- [ ] Check error messages in console
- [ ] Test error boundary

---

## 🎯 Phase 2: Important Optimizations

### Task 4: Implement Code Splitting

**Priority:** ⚠️ IMPORTANT  
**Estimated Time:** 1-2 hours  
**Impact:** ⭐⭐⭐⭐ (Bundle Size)

#### Step 4.1: Lazy Load Heavy Components

**File:** `src/app/layout.tsx`

**Before:**
```typescript
import ChatWidget from "@/components/ChatWidget";
```

**After:**
```typescript
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
  loading: () => null, // Or a loading spinner
});
```

**File:** `src/app/page.tsx` (or HomePageClient)

**Before:**
```typescript
import QuoteForm from "@/components/QuoteForm";
```

**After:**
```typescript
import dynamic from "next/dynamic";

const QuoteForm = dynamic(() => import("@/components/QuoteForm"), {
  loading: () => <div className="animate-pulse">Loading form...</div>,
});
```

#### Step 4.2: Lazy Load Other Heavy Components

- Charts (if using recharts)
- Carousels (if using embla-carousel)
- Rich text editors
- Any component > 50KB

#### Step 4.3: Testing Checklist

- [ ] Check bundle size reduction (npm run build)
- [ ] Verify components load correctly
- [ ] Test loading states
- [ ] Check Network tab for code splitting

---

### Task 5: Fix TypeScript Errors

**Priority:** ⚠️ IMPORTANT  
**Estimated Time:** 2-4 hours  
**Impact:** ⭐⭐⭐ (Code Quality)

#### Step 5.1: Enable Type Checking

**File:** `next.config.js`

**Before:**
```javascript
typescript: {
  ignoreBuildErrors: true,
}
```

**After:**
```javascript
typescript: {
  ignoreBuildErrors: false, // Or remove this entirely
}
```

#### Step 5.2: Run Type Check

```bash
npm run build
```

#### Step 5.3: Fix Errors One by One

1. Start with the most critical errors
2. Fix type definitions
3. Add proper types where missing
4. Use `any` only as last resort (with comments)

#### Step 5.4: Testing Checklist

- [ ] Build succeeds without errors
- [ ] No TypeScript errors in IDE
- [ ] All types are properly defined
- [ ] Remove `ignoreBuildErrors` from config

---

## 🎯 Phase 3: Nice to Have

### Task 6: Add Loading States

**Priority:** ⚠️ LOW  
**Estimated Time:** 1 hour  
**Impact:** ⭐⭐⭐ (UX)

#### Step 6.1: Create loading.tsx Files

**File:** `src/app/loading.tsx`

```typescript
import { PageSkeleton } from "@/components/ui/page-skeleton";

export default function Loading() {
  return <PageSkeleton />;
}
```

**File:** `src/app/about/loading.tsx`

```typescript
import { PageSkeleton } from "@/components/ui/page-skeleton";

export default function Loading() {
  return <PageSkeleton />;
}
```

Repeat for other routes as needed.

---

### Task 7: Optimize QueryClient

**Priority:** ⚠️ LOW  
**Estimated Time:** 30 minutes  
**Impact:** ⭐⭐ (Performance)

#### Step 7.1: Update QueryProvider

**File:** `src/providers/QueryProvider.tsx`

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 24 * 60 * 60 * 1000, // 3 days
      gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days (keep longer)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false, // Don't refetch if data exists
    },
  },
});
```

---

### Task 8: Add Compression Headers

**Priority:** ⚠️ LOW  
**Estimated Time:** 30 minutes  
**Impact:** ⭐⭐ (Performance)

#### Step 8.1: Update next.config.js

**File:** `next.config.js`

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

---

## 📅 Execution Timeline

### Week 1: Critical Tasks
- **Day 1-2:** Task 1 (SEO Migration)
- **Day 3-4:** Task 2 (Image Optimization)
- **Day 5:** Task 3 (API Error Handling)

### Week 2: Important Tasks
- **Day 1-2:** Task 4 (Code Splitting)
- **Day 3-5:** Task 5 (TypeScript Fixes)

### Week 3: Nice to Have
- **Day 1:** Task 6 (Loading States)
- **Day 2:** Task 7 (QueryClient Optimization)
- **Day 3:** Task 8 (Compression Headers)

---

## ✅ Pre-Execution Checklist

- [ ] Create feature branch: `git checkout -b feature/optimizations`
- [ ] Backup current code
- [ ] Review all tasks
- [ ] Set up testing environment
- [ ] Have Strapi running for testing

## ✅ Post-Execution Checklist

- [ ] All tests pass
- [ ] Build succeeds: `npm run build`
- [ ] No console errors
- [ ] Lighthouse score improved
- [ ] Bundle size reduced
- [ ] All pages load correctly
- [ ] SEO metadata verified
- [ ] Images optimized
- [ ] Error handling works

---

## 🧪 Testing Strategy

### After Each Task:
1. **Manual Testing:** Test affected pages
2. **Build Test:** `npm run build`
3. **Lighthouse:** Run Lighthouse audit
4. **Bundle Analysis:** Check bundle size

### Final Testing:
1. **Full Regression:** Test all 23 pages
2. **Performance:** Lighthouse + Core Web Vitals
3. **SEO:** Verify metadata in HTML
4. **Error Scenarios:** Test error handling
5. **Production Build:** Test production build locally

---

## 📝 Notes

- Work on one task at a time
- Commit after each completed task
- Test thoroughly before moving to next task
- Keep OPTIMIZATION_ANALYSIS.md updated with progress
- Document any issues or deviations

---

## 🚀 Quick Start

1. Start with **Task 1** (SEO Migration)
2. Test thoroughly
3. Commit changes
4. Move to **Task 2** (Image Optimization)
5. Repeat for all tasks

Good luck! 🎉

