import { Helmet } from "react-helmet-async";

// Layout & UI Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

// Sections
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";

import { useLandingPage } from "@/hooks/api/useLandingPage";

const Index = () => {
  const { data, isLoading, error } = useLandingPage();

  // Show a clean loading state or spinner
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Unable to load page content. Please try again later.</div>;
  if (!data) return null;

  // Destructure values for cleaner props passing
  const {
    landingPageSeo,
    trustBar,
    why_choose_us,
    pricing_section,
    TestimonialsSection: testimonialsData,
    FAQSection: faqData,
    FinalCTA: ctaArray,
    hero_section: heroSectionData
  } = data;

  return (
    <>
      <Helmet>
        <title>{landingPageSeo?.title || "CarShippers.ai | Instant Auto Transport"}</title>
        <meta name="description" content={landingPageSeo?.content} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <HeroSection heroSectionData={heroSectionData} />

          <TrustBar stats={trustBar?.stats} />

          <HowItWorks />

          <WhyChooseUs comparisons={why_choose_us?.comparions} />

          <PricingSection
            title={pricing_section?.title}
            subTitle={pricing_section?.sub_title}
            routes={pricing_section?.routes}
            buttonLabel={pricing_section?.button_label}
            routeTitle={pricing_section?.route_title}
          />

          <TestimonialsSection
            title={testimonialsData?.testimonial_title}
            subTitle={testimonialsData?.testimonial_sub_title}
            reviewsInfo={testimonialsData?.testimonial_reviews}
            testimonials={testimonialsData?.testimonials}
            testimonialsLink={testimonialsData?.testimonial_reviews_link}
          />

          <FAQSection data={faqData} />

          {/* Destructure the first item of the FinalCTA array */}
          <FinalCTA content={ctaArray?.[0]} />
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </>
  );
};

export default Index;