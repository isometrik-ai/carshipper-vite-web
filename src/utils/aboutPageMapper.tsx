import { useMemo } from "react";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import TextSection from "@/components/sections/TextSection";
import HowItWorks from "@/components/sections/HowItWorks";
import FeatureListSection from "@/components/sections/FeatureListSection";
import FinalCTA from "@/components/sections/FinalCTA";
import type {
    AboutPageContentComponent,
    TextSection as TextSectionType,
    FeatureListSection as FeatureListSectionType,
} from "@/types/AboutPage.types";
import type {
    HeroSection as HeroSectionType,
    StatsBar,
    ProcessSection,
    CallToAction,
} from "@/types/LandingPage.types";

/**
 * Renders a single About page content component
 */
const renderComponent = (component: AboutPageContentComponent, index: number): JSX.Element | null => {
    const key = `${component.__component}-${component.id || index}`;

    switch (component.__component) {
        case "shared.hero-section":
            return <HeroSection key={key} data={component as HeroSectionType} showQuoteForm={false} />;

        case "shared.stats-bar":
            return <TrustBar key={key} data={component as StatsBar} />;

        case "shared.text-section":
            return <TextSection key={key} data={component as TextSectionType} />;

        case "shared.process-section":
            return <HowItWorks key={key} data={component as ProcessSection} />;

        case "shared.feature-list-section":
            return <FeatureListSection key={key} data={component as FeatureListSectionType} />;

        case "shared.call-to-action":
            return <FinalCTA key={key} data={component as CallToAction} />;

        default:
            console.warn(`Unknown component type: ${(component as AboutPageContentComponent).__component}`);
            return null;
    }
};

/**
 * Custom hook to render About page content components from Strapi data
 * Memoizes the result to prevent unnecessary re-renders
 */
export const useAboutPageContentRenderer = (pageContent: AboutPageContentComponent[]) => {
    return useMemo(() => {
        return pageContent.map(renderComponent).filter((component): component is JSX.Element => component !== null);
    }, [pageContent]);
};
