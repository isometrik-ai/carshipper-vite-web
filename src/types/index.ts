/**
 * Types Index
 * Central export point for all types
 */

// Common/Generic Types
export * from "./common.types";

// API Types
export * from "./api.types";

// Domain-specific types
export * from "./about.types";
export * from "./CaliforniaShipping.types";
// Export FAQ types but exclude FAQItem (already in common.types and LandingPage.types)
export type { FAQHero, FAQCategory, FAQResponse } from "./FAQ.types";
export * from "./FleetTransport.types";
export * from "./FlatbedTransport.types";
export * from "./Footer.types";
// Export Header types but exclude NavLink (already in common.types)
export type { HeaderData, HeaderResponse } from "./Header.types";
export * from "./HeavyHauling.types";
export * from "./hero.types";
export * from "./how-it-works.types";
export * from "./landing-page.types";
export * from "./LosAngelesShipping.types";
export * from "./open-transport";
export * from "./quote-form.types";
