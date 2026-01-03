import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>CarShippers.ai | Ship Your Car in 30 Seconds | Instant Auto Transport Quotes</title>
        <meta
          name="description"
          content="Get an instant car shipping quote in 30 seconds. Licensed carriers, door-to-door service, no hidden fees. Ship your car anywhere in the US with CarShippers.ai."
        />
        <meta name="keywords" content="car shipping, auto transport, vehicle shipping, car transport, ship my car" />
        <link rel="canonical" href="https://carshippers.ai" />
        
        {/* Open Graph */}
        <meta property="og:title" content="CarShippers.ai | Instant Car Shipping Quotes" />
        <meta property="og:description" content="Get an instant car shipping quote in 30 seconds. Licensed carriers, door-to-door service, no hidden fees." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carshippers.ai" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CarShippers.ai | Instant Car Shipping Quotes" />
        <meta name="twitter:description" content="Get an instant car shipping quote in 30 seconds. Licensed carriers, door-to-door service, no hidden fees." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <HeroSection />
          <TrustBar />
          <HowItWorks />
          <WhyChooseUs />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <FinalCTA />
        </main>
        
        <Footer />
        <ChatWidget />
      </div>
    </>
  );
};

export default Index;
