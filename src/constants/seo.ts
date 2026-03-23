const DEFAULT_SITE_URL = "https://carshippers.ai";

const getSafeSiteUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof envUrl !== "string" || envUrl?.trim()?.length === 0) {
    return DEFAULT_SITE_URL;
  }
  try {
    const parsed = new URL(envUrl);
    if (parsed?.protocol === "http:" || parsed?.protocol === "https:") {
      return parsed?.toString()?.replace(/\/$/, "");
    }
    return DEFAULT_SITE_URL;
  } catch {
    return DEFAULT_SITE_URL;
  }
};

export const SEO_LIMITS = {
  titleMaxChars: 45,
  descriptionMinChars: 70,
  descriptionMaxChars: 155,
} as const;

export const SEO_SITE = {
  name: "CarShippers AI",
  url: getSafeSiteUrl(),
} as const;

export const SEO_FALLBACKS = {
  global: {
    title: "CarShippers AI | Fast, Trusted Auto Transport",
    description:
      "Get fast, reliable car shipping quotes with trusted US carriers, clear pricing, and door-to-door auto transport support.",
  },
  about: {
    title: "About CarShippers AI | Smart Vehicle Shipping",
    description:
      "Learn how CarShippers AI combines human expertise and smart tools to deliver fast, reliable, and transparent vehicle shipping.",
  },
} as const;

