# React + Vite to Next.js Migration Analysis

## 📊 Current Architecture Overview

### **Project Structure**
- **Framework**: React 18.3.1 + Vite 5.4.19
- **Routing**: React Router DOM v6.30.1 (Client-side routing)
- **State Management**: TanStack Query (React Query) v5.83.0
- **Styling**: Tailwind CSS 3.4.17 + shadcn/ui components
- **TypeScript**: v5.8.3
- **Build Tool**: Vite (SWC plugin)
- **Deployment**: Vercel (SPA with rewrites)

### **Key Features**
- ✅ 25+ pages/routes
- ✅ Strapi CMS integration (26 API endpoints)
- ✅ SEO optimization (react-helmet-async)
- ✅ Client-side data fetching with React Query
- ✅ Dynamic component rendering from Strapi
- ✅ Structured data (JSON-LD) generation
- ✅ Client-side cache purging utility

---

## 🔍 Detailed Analysis

### **1. Routing System**

#### Current Implementation
- **React Router DOM** with `<BrowserRouter>` and `<Routes>`
- 25 routes defined in `App.tsx`
- Client-side only routing (SPA)
- Catch-all route for 404 handling

#### Routes Identified:
```
/ (Index)
/about
/contact
/how-it-works
/pricing
/faq
/privacy
/terms
/open-transport
/enclosed-transport
/heavy-hauling
/flatbed-transport
/fleet-transport
/dealership-delivery
/auto-auction-shipping
/rental-car-logistics
/oem-transport
/track
/blog
/quote
/california-car-shipping
/los-angeles-car-shipping
/purge-cache
/* (404)
```

#### Next.js Migration:
- ✅ **App Router** (Next.js 13+): Use `app/` directory structure
- ✅ Each route becomes a `page.tsx` file
- ✅ `not-found.tsx` for 404 handling
- ✅ `layout.tsx` for shared layouts (Header/Footer)
- ⚠️ **Consideration**: Next.js uses file-based routing (no route config needed)

---

### **2. Data Fetching Patterns**

#### Current Implementation
- **TanStack Query** for all API calls
- Client-side fetching only (`useQuery` hooks)
- 26 API files in `src/api/` directory
- All fetch calls use `import.meta.env.VITE_API_URL`
- React Query configured with:
  - 3-day stale time
  - 3-day cache time
  - No refetch on window focus
  - Retry: 1

#### API Endpoints Used:
```
/api/header
/api/footer
/api/landing-page
/api/chat-widget
/api/about
/api/pricing
/api/faq
/api/privacy
/api/terms
/api/contact
/api/blog
/api/quote
/api/track-shipment
/api/open-transport
/api/enclosed-transport
... (and 12 more service pages)
```

#### Next.js Migration Options:

**Option A: Server Components (Recommended)**
- Use Next.js Server Components for initial data fetching
- Fetch data directly in `page.tsx` (no client-side JS needed)
- Better SEO, faster initial load
- Still use React Query for client-side updates/refetching

**Option B: Keep Client-Side Fetching**
- Use `'use client'` directive
- Keep existing React Query setup
- Simpler migration, but loses SSR benefits

**Recommendation**: **Hybrid approach**
- Server Components for initial page load (SEO + performance)
- React Query for client-side interactions and cache management
- Use `useQuery` in Client Components when needed

---

### **3. SEO Implementation**

#### Current Implementation
- **react-helmet-async** for meta tags
- Dynamic SEO per page via `<PageSEO>` component
- JSON-LD structured data generation
- Open Graph and Twitter Card support
- Canonical URLs

#### Next.js Migration:
- ✅ **Built-in Metadata API** (Next.js 13+)
- ✅ `metadata` export in `page.tsx` or `layout.tsx`
- ✅ `generateMetadata()` function for dynamic SEO
- ✅ Built-in JSON-LD support
- ⚠️ **Migration needed**: Convert `<PageSEO>` component to Next.js metadata exports

**Example Migration Pattern**:
```typescript
// Current: <PageSEO seoMetadata={data} />
// Next.js: export async function generateMetadata() { return { ... } }
```

---

### **4. Environment Variables**

#### Current Implementation
- Uses `import.meta.env.VITE_API_URL`
- Uses `import.meta.env.VITE_PURGE_CACHE_TOKEN`
- Vite-specific prefix (`VITE_`)

#### Next.js Migration:
- ✅ Use `process.env.NEXT_PUBLIC_*` for client-side variables
- ✅ Use `process.env.*` (no prefix) for server-side only
- ⚠️ **Action Required**: Rename all `VITE_*` to `NEXT_PUBLIC_*`
- ⚠️ **Action Required**: Update all 26 API files

---

### **5. Component Structure**

#### Current Structure:
```
src/
├── components/        (50+ UI components)
├── pages/            (25 page components)
├── api/              (26 API hooks)
├── types/            (TypeScript types)
├── utils/            (Utilities)
├── lib/              (Libraries)
└── hooks/            (Custom hooks)
```

#### Next.js Structure (App Router):
```
app/
├── (routes)/
│   ├── page.tsx       (Home)
│   ├── about/
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   └── ...
├── layout.tsx         (Root layout)
└── not-found.tsx

components/            (Reusable components)
lib/                   (Utilities, unchanged)
types/                 (Types, unchanged)
```

---

### **6. Dependencies Analysis**

#### ✅ Compatible (No Changes Needed):
- `react`, `react-dom` (Next.js includes these)
- `@radix-ui/*` (All UI primitives)
- `tailwindcss`, `autoprefixer`, `postcss`
- `clsx`, `tailwind-merge`
- `framer-motion`
- `lucide-react`
- `date-fns`
- `zod`, `react-hook-form`
- `@tanstack/react-query` (Can be used in Next.js)

#### ⚠️ Needs Replacement:
- `react-router-dom` → **Next.js built-in routing** (remove)
- `react-helmet-async` → **Next.js Metadata API** (remove)
- `@vitejs/plugin-react-swc` → **Next.js built-in** (remove)

#### ✅ Keep but May Need Updates:
- `@tanstack/react-query` (Works in Next.js, may need provider setup)
- `next-themes` (Already Next.js compatible)
- `@strapi/blocks-react-renderer` (Should work)

#### 📦 New Dependencies Needed:
- `next` (Framework)
- `@tanstack/react-query` provider setup (if keeping client-side fetching)

---

### **7. Build Configuration**

#### Current (Vite):
- `vite.config.ts` with path aliases (`@/*`)
- Port: 8080
- SWC compiler
- Path alias: `@` → `./src`

#### Next.js:
- `next.config.js` for configuration
- Built-in TypeScript support
- Path aliases via `tsconfig.json` (already configured)
- Port: 3000 (default, configurable)

---

### **8. Special Features**

#### **Purge Cache Route** (`/purge-cache`)
- Client-side only utility
- Uses React Query's `queryClient.clear()`
- **Next.js Migration**: Can become API route or keep as client component

#### **Dynamic Component Rendering**
- `componentMapper.tsx` renders Strapi components dynamically
- Uses `__component` field from Strapi
- **Next.js**: Should work the same way (no changes needed)

#### **Strapi Integration**
- All API calls are client-side
- **Next.js Opportunity**: Move to Server Components for better performance

---

## 🚨 Migration Challenges & Considerations

### **High Priority**

1. **Routing Migration**
   - 25 routes need to be converted to file-based routing
   - React Router hooks (`useLocation`, `useNavigate`) → Next.js equivalents
   - **Impact**: Medium effort, systematic change

2. **Environment Variables**
   - 26+ files use `import.meta.env.VITE_*`
   - Need to replace with `process.env.NEXT_PUBLIC_*`
   - **Impact**: Low effort, find & replace

3. **SEO Migration**
   - Convert `<PageSEO>` component to Next.js metadata
   - Move JSON-LD to metadata API or keep in component
   - **Impact**: Medium effort, requires understanding Next.js metadata API

4. **Data Fetching Strategy**
   - Decide: Server Components vs Client Components
   - React Query setup for Next.js (if keeping client-side)
   - **Impact**: High effort if moving to Server Components

### **Medium Priority**

5. **Client-Side Only Code**
   - `window`, `document` usage needs `'use client'` directive
   - `useEffect` hooks for client-side logic
   - **Impact**: Low effort, add directives where needed

6. **Image Optimization**
   - Currently using regular `<img>` tags
   - Next.js `<Image>` component for optimization
   - **Impact**: Medium effort, but improves performance

7. **API Routes**
   - Currently all external (Strapi)
   - Could add Next.js API routes for proxy/caching
   - **Impact**: Optional, low priority

### **Low Priority**

8. **Build Output**
   - Vite: SPA build
   - Next.js: SSR/SSG by default
   - **Impact**: None, Next.js handles it

9. **Deployment**
   - Currently Vercel with SPA rewrites
   - Next.js native Vercel support (better)
   - **Impact**: Positive, easier deployment

---

## 📋 Migration Strategy Recommendations

### **Phase 1: Setup & Foundation** (1-2 days)
1. Initialize Next.js project (App Router)
2. Install dependencies
3. Setup Tailwind CSS
4. Configure TypeScript paths
5. Setup environment variables

### **Phase 2: Core Migration** (3-5 days)
1. Migrate routing (convert routes to `app/` structure)
2. Migrate layouts (Header/Footer to root layout)
3. Migrate environment variables (find & replace)
4. Setup React Query provider (if keeping client-side)

### **Phase 3: Page Migration** (5-7 days)
1. Migrate pages one by one
2. Convert SEO components to metadata API
3. Update API calls (environment variables)
4. Test each route

### **Phase 4: Optimization** (2-3 days)
1. Convert to Server Components where possible
2. Add Next.js Image optimization
3. Setup proper caching strategies
4. Performance testing

### **Phase 5: Cleanup** (1 day)
1. Remove old dependencies
2. Clean up unused files
3. Update documentation
4. Final testing

**Total Estimated Time**: 12-18 days

---

## 🎯 Benefits of Migration

### **Performance**
- ✅ Server-Side Rendering (SSR) for better SEO
- ✅ Automatic code splitting
- ✅ Image optimization built-in
- ✅ Faster initial page loads

### **Developer Experience**
- ✅ Better TypeScript support
- ✅ Built-in API routes
- ✅ File-based routing (simpler)
- ✅ Better error handling

### **SEO**
- ✅ Server-rendered meta tags
- ✅ Better crawlability
- ✅ Built-in sitemap generation
- ✅ Better Core Web Vitals

### **Deployment**
- ✅ Native Vercel support
- ✅ Better caching strategies
- ✅ Edge functions support
- ✅ Incremental Static Regeneration (ISR)

---

## ⚠️ Risks & Considerations

1. **Learning Curve**: Team needs to understand Next.js App Router
2. **Breaking Changes**: Some React Router patterns won't work
3. **Testing**: All routes need thorough testing
4. **Deployment**: Need to ensure Vercel config is correct
5. **Strapi Integration**: May need to adjust API calls for SSR

---

## 📝 Next Steps

1. **Decision**: Confirm migration approach (Server Components vs Client Components)
2. **Setup**: Create Next.js project structure
3. **Pilot**: Migrate 1-2 pages as proof of concept
4. **Plan**: Create detailed migration checklist
5. **Execute**: Follow phased approach above

---

## 🔗 Key Files to Review

- `src/App.tsx` - Main routing configuration
- `src/main.tsx` - Entry point
- `src/components/seo/PageSEO.tsx` - SEO implementation
- `src/api/*.ts` - All API files (26 files)
- `src/utils/componentMapper.tsx` - Dynamic component rendering
- `vite.config.ts` - Build configuration
- `vercel.json` - Deployment configuration

---

**Analysis Date**: 2026-02-12
**Current Framework**: React 18.3.1 + Vite 5.4.19
**Target Framework**: Next.js 14+ (App Router)
**Estimated Migration Complexity**: Medium-High
**Estimated Time**: 12-18 days

