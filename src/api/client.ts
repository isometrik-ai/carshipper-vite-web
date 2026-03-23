import { apiRequest } from "@/lib/api-client";

export const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

// Deprecated: prefer importing `apiRequest` directly from `@/lib/api-client` so that
// all timeout/retry configuration lives in a single shared module.
export { apiRequest };

