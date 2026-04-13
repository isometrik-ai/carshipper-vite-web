function getEnvConfig(value: string | undefined, name: string, required = true): string {
  if (!value) {
    const message = `❌ Missing environment variable: ${name}`;

    if (required && process.env.NODE_ENV === "production") {
      throw new Error(message);
    }

    if (typeof window !== "undefined") {
      console.warn(message);
    } else {
      // eslint-disable-next-line no-console
      console.warn(message);
    }

    return "";
  }

  return value;
}

export const ENV_CONFIG = {
  // IMPORTANT: must reference env vars directly so Next.js can inline them at build time
  STRAPI_API_URL: getEnvConfig(process.env.NEXT_PUBLIC_STRAPI_API_URL, "NEXT_PUBLIC_STRAPI_API_URL", false),
  MAP_BOX_ACCESS_TOKEN: getEnvConfig(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN, "NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN", false),
  BLOG_API_URL: getEnvConfig(process.env.NEXT_PUBLIC_BLOG_API_URL, "NEXT_PUBLIC_BLOG_API_URL", false),
};