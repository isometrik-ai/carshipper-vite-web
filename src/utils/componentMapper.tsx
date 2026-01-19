import { useMemo } from "react";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";
import type {
    PageContentComponent,
    HeroSection as HeroSectionType,
    StatsBar,
    ProcessSection,
    ComparisonSection,
    PricingDisplay,
    TestimonialsDisplay,
    FAQDisplay,
    CallToAction,
} from "@/types/LandingPage.types";

/**
 * Type guard to check if component matches a specific type
 */
const isComponentType = (
    component: PageContentComponent,
    type: string
): component is PageContentComponent & { __component: typeof type } => {
    return component.__component === type;
};

/**
 * Renders a single page content component
 */
const renderComponent = (component: PageContentComponent, index: number): JSX.Element | null => {
    const key = `${component.__component}-${component.id || index}`;

    switch (component.__component) {
        case "shared.hero-section":
            return <HeroSection key={key} data={component as HeroSectionType} />;

        case "shared.stats-bar":
            return <TrustBar key={key} data={component as StatsBar} />;

        case "shared.process-section":
            return <HowItWorks key={key} data={component as ProcessSection} />;

        case "shared.comparison-section":
            return <WhyChooseUs key={key} data={component as ComparisonSection} />;

        case "shared.pricing-display":
            return <PricingSection key={key} data={component as PricingDisplay} />;

        case "shared.testimonials-display":
            return <TestimonialsSection key={key} data={component as TestimonialsDisplay} />;

        case "shared.faq-display":
            return <FAQSection key={key} data={component as FAQDisplay} />;

        case "shared.call-to-action":
            return <FinalCTA key={key} data={component as CallToAction} />;

        default:
            console.warn(`Unknown component type: ${(component as PageContentComponent).__component}`);
            return null;
    }
};

/**
 * Custom hook to render page content components from Strapi data
 * Memoizes the result to prevent unnecessary re-renders
 */
export const usePageContentRenderer = (pageContent: PageContentComponent[]) => {
    return useMemo(() => {
        return pageContent.map(renderComponent).filter((component): component is JSX.Element => component !== null);
    }, [pageContent]);
};
