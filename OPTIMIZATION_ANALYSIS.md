# Code Optimization Analysis & Tasks

## 📊 Current State Analysis

### ✅ What's Already Good
1. **React Query Configuration**: Good caching strategy (3 days staleTime)
2. **Font Optimization**: Using Next.js `next/font/google` for Inter font
3. **SWC Minification**: Enabled in next.config.js
4. **React Strict Mode**: Enabled
5. **Path Aliases**: Properly configured with `@/*` mapping

### ⚠️ Areas Needing Optimization

---

## 🎯 Priority 1: Critical SEO & Performance

### 1. **Migrate SEO to Next.js Metadata API** ⚠️ HIGH PRIORITY
**Current Issue:**
- Using client-side `PageSEO` component that manipulates DOM
- SEO metadata not available during SSR/SSG
- Search engines may not see metadata properly

**Solution:**
- Replace `PageSEO` with `generateMetadata` function in each page
- Use Next.js Metadata API for proper SSR SEO
- Keep JSON-LD structured data (can be in layout or page)

**Files to Update:**
- All 23 pages in `src/app/*/page.tsx`
- Remove `PageSEO` component usage
- Add `generateMetadata` export to each page

**Benefits:**
- ✅ Better SEO (metadata in HTML at build/render time)
- ✅ Faster initial page load
- ✅ Better social media sharing (OG tags in HTML)
- ✅ Improved Core Web Vitals

---

### 2. **Image Optimization with Next.js Image Component** ⚠️ HIGH PRIORITY
**Current Issue:**
- Background images likely using CSS `background-image` or `<img>` tags
- No automatic optimization, lazy loading, or responsive images
- Larger bundle sizes

**Solution:**
- Replace all `<img>` tags with `next/image` component
- Use `next/image` for background images (with proper styling)
- Configure image domains in `next.config.js` (already done for localhost)

**Files to Check:**
- `src/components/sections/HeroSection.tsx` (background images)
- All components using images from Strapi
- Any static images in `public/` folder

**Benefits:**
- ✅ Automatic image optimization (WebP, AVIF)
- ✅ Lazy loading by default
- ✅ Responsive images (srcset)
- ✅ Reduced bandwidth usage
- ✅ Better Core Web Vitals (LCP)

---

### 3. **API Client Error Handling** ⚠️ MEDIUM PRIORITY
**Current Issue:**
```typescript
// src/api/client.ts - Too simple, no error handling
export async function apiGet(endpoint: string) {
    const res = await fetch(`${API_URL}/api/${endpoint}`);
    return res.json();
}
```

**Solution:**
- Add proper error handling (network errors, HTTP errors)
- Add timeout handling
- Add retry logic for failed requests
- Better TypeScript types
- Add request/response interceptors

**Benefits:**
- ✅ Better error messages for debugging
- ✅ Graceful degradation
- ✅ Improved user experience
- ✅ Better monitoring capabilities

---

## 🎯 Priority 2: Code Quality & Performance

### 4. **Code Splitting with Dynamic Imports** ⚠️ MEDIUM PRIORITY
**Current Issue:**
- All pages are client components (`'use client'`)
- Heavy components (ChatWidget, QuoteForm) loaded on every page
- Large initial bundle size

**Solution:**
- Use `next/dynamic` for heavy components
- Lazy load ChatWidget (only when needed)
- Lazy load heavy UI components (charts, carousels)
- Consider server components where possible

**Example:**
```typescript
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false, // Only load on client
  loading: () => <div>Loading chat...</div>
});
```

**Benefits:**
- ✅ Smaller initial bundle size
- ✅ Faster page loads
- ✅ Better code splitting
- ✅ Improved Time to Interactive (TTI)

---

### 5. **Fix TypeScript Errors** ⚠️ MEDIUM PRIORITY
**Current Issue:**
```javascript
// next.config.js
typescript: {
  ignoreBuildErrors: true, // ❌ Hiding real issues
}
```

**Solution:**
- Fix all TypeScript errors
- Remove `ignoreBuildErrors: true`
- Enable strict mode gradually if needed
- Fix type definitions

**Benefits:**
- ✅ Catch bugs at compile time
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring

---

### 6. **Add Loading States (loading.tsx)** ⚠️ LOW PRIORITY
**Current Issue:**
- Using custom `PageSkeleton` component
- Not using Next.js built-in loading states

**Solution:**
- Add `loading.tsx` files in route folders
- Use Next.js Suspense boundaries
- Better loading UX

**Benefits:**
- ✅ Consistent loading states
- ✅ Better UX during navigation
- ✅ Automatic Suspense boundaries

---

## 🎯 Priority 3: Configuration & Best Practices

### 7. **Optimize QueryClient Configuration** ⚠️ LOW PRIORITY
**Current Configuration:**
```typescript
staleTime: 3 * 24 * 60 * 60 * 1000, // 3 days
gcTime: 3 * 24 * 60 * 60 * 1000, // 3 days
```

**Potential Improvements:**
- Different staleTime for different data types
- Shorter cache for frequently changing data
- Longer cache for static content
- Add `refetchOnMount: false` for some queries

**Benefits:**
- ✅ Better cache utilization
- ✅ Reduced API calls
- ✅ Faster page loads

---

### 8. **Add Compression & Caching Headers** ⚠️ LOW PRIORITY
**Current Issue:**
- No explicit compression or caching headers configured

**Solution:**
- Add compression in `next.config.js`
- Configure caching headers for static assets
- Add security headers

**Example:**
```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
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

**Benefits:**
- ✅ Faster page loads
- ✅ Reduced server load
- ✅ Better CDN caching

---

## 📋 Optimization Checklist

### Critical (Do Before API Integration)
- [ ] **1. Migrate SEO to Metadata API** - All pages
- [ ] **2. Replace images with Next.js Image** - All components
- [ ] **3. Add API error handling** - API client

### Important (Do Soon)
- [ ] **4. Implement code splitting** - Heavy components
- [ ] **5. Fix TypeScript errors** - Remove ignoreBuildErrors

### Nice to Have (Can Do Later)
- [ ] **6. Add loading.tsx files** - Better loading states
- [ ] **7. Optimize QueryClient** - Better caching
- [ ] **8. Add compression headers** - Performance

---

## 🚀 Recommended Order of Implementation

1. **Start with SEO Migration** (highest impact on SEO)
2. **Image Optimization** (high impact on performance)
3. **API Error Handling** (critical for reliability)
4. **Code Splitting** (improves bundle size)
5. **TypeScript Fixes** (improves code quality)
6. **Other optimizations** (as needed)

---

## 📊 Expected Impact

| Optimization | Performance Impact | SEO Impact | User Experience |
|-------------|-------------------|------------|----------------|
| Metadata API | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Image Optimization | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| API Error Handling | ⭐ | ⭐ | ⭐⭐⭐⭐ |
| Code Splitting | ⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐ |
| TypeScript Fixes | ⭐ | ⭐ | ⭐⭐ |

---

## 🔍 Additional Recommendations

1. **Bundle Analysis**: Run `npm run build` and analyze bundle size
2. **Lighthouse Audit**: Test pages with Lighthouse for performance
3. **Core Web Vitals**: Monitor LCP, FID, CLS
4. **API Response Times**: Monitor Strapi API response times
5. **Error Monitoring**: Set up error tracking (Sentry, etc.)

---

## 📝 Notes

- All pages currently use `'use client'` and `force-dynamic` - this is fine for CMS-driven content
- Consider ISR (Incremental Static Regeneration) for pages that don't change frequently
- Strapi images should use Next.js Image component with proper domain configuration
- SEO migration is the most critical task before API integration

