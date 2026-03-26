/**
 * Shared content components used across transport page types.
 */
export type SharedTransportContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./AutoAuctionShipping.types").ServiceCards
  | import("./AboutPage.types").TextSection
  | import("./LandingPage.types").FAQDisplay
  | import("./LandingPage.types").CallToAction;

/**
 * Common transport component variants reused by multiple pages.
 */
export type TransportContentComponentVariants =
  | SharedTransportContentComponent
  | import("./LandingPage.types").StatsBar
  | import("./LandingPage.types").ComparisonSection
  | import("./LandingPage.types").TestimonialsDisplay;

export type TransportWithStatsContentComponent =
  | SharedTransportContentComponent
  | import("./LandingPage.types").StatsBar;

export type TransportWithComparisonContentComponent =
  | SharedTransportContentComponent
  | import("./LandingPage.types").ComparisonSection
  | import("./LandingPage.types").TestimonialsDisplay;
