/**
 * Get the full URL for a Strapi media file
 * @param url - The relative URL from Strapi (e.g., "/uploads/image.jpg")
 * @returns The full URL including the Strapi base URL
 */
export const getStrapiMediaUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  const STRAPI_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  
  // If URL already includes http/https, return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  
  // Otherwise, prepend Strapi base URL
  return `${STRAPI_API_URL}${url}`;
};
