/**
 * Shared content components used across transport page types.
 */
export type SharedTransportContentComponent =
  | import("./LandingPage.types").HeroSection
  | import("./AutoAuctionShipping.types").ServiceCards
  | import("./AboutPage.types").TextSection
  | import("./LandingPage.types").FAQDisplay
  | import("./LandingPage.types").CallToAction;
