export const SEO_LIMITS = {
  titleMaxChars: 45,
  descriptionMinChars: 70,
  descriptionMaxChars: 155,
} as const;

export const SEO_SITE = {
  name: "CarShippers AI",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://carshippers.ai",
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

