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
import ProcessStepsSection from "@/components/sections/ProcessStepsSection";

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
 * Ensures proper heading hierarchy: Only HeroSection can render H1, all others use H2+
 */
const renderComponent = (component: PageContentComponent, index: number): JSX.Element | null => {
    const key = `${component.__component}-${component.id || index}`;

    switch (component.__component) {
        case "shared.hero-section":
            // HeroSection is the only component that renders H1 - must be first
            return <HeroSection key={key} data={component as HeroSectionType} />;

        case "shared.stats-bar":
            // TrustBar uses no headings, only divs - correct
            return <TrustBar key={key} data={component as StatsBar} />;

        case "shared.process-section":
            return <ProcessStepsSection key={key} sectionTitle={component.section_title} sectionSubtitle={component.section_subtitle} steps={component.steps} ctaButton={component.cta_button} />;

        case "shared.comparison-section":
            // WhyChooseUs uses H2 for section title - correct
            return <WhyChooseUs key={key} data={component as ComparisonSection} />;

        case "shared.pricing-display":
            // PricingSection uses H2 for section title - correct
            return <PricingSection key={key} data={component as PricingDisplay} />;

        case "shared.testimonials-display":
            // TestimonialsSection uses H2 for section title - correct
            return <TestimonialsSection key={key} data={component as TestimonialsDisplay} />;

        case "shared.faq-display":
            // FAQSection uses H2 for section title, H3 for CTA - correct hierarchy
            return <FAQSection key={key} data={component as FAQDisplay} />;

        case "shared.call-to-action":
            // FinalCTA uses H2 for section title - correct
            return <FinalCTA key={key} data={component as CallToAction} />;

        default:
            console.warn(`Unknown component type: ${(component as PageContentComponent).__component}`);
            return null;
    }
};

/**
 * Custom hook to render page content components from Strapi data
 * Memoizes the result to prevent unnecessary re-renders
 * Ensures HeroSection (with H1) is always rendered first for proper SEO
 */
export const usePageContentRenderer = (pageContent: PageContentComponent[]) => {
    return useMemo(() => {
        // Separate hero section from other components
        const heroSection = pageContent.find(c => c.__component === "shared.hero-section");
        const otherComponents = pageContent.filter(c => c.__component !== "shared.hero-section");

        // Render hero section first (contains the only H1), then other components
        const renderedComponents: (JSX.Element | null)[] = [];

        if (heroSection) {
            renderedComponents.push(renderComponent(heroSection, 0));
        }

        // Render other components
        otherComponents.forEach((component, index) => {
            renderedComponents.push(renderComponent(component, index + 1));
        });

        return renderedComponents.filter((component): component is JSX.Element => component !== null);
    }, [pageContent]);
};
