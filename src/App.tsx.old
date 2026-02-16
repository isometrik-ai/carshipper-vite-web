import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowItWorksPage from "./pages/HowItWorksPage";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import OpenTransport from "./pages/OpenTransport";
import EnclosedTransport from "./pages/EnclosedTransport";
import HeavyHauling from "./pages/HeavyHauling";
import FlatbedTransport from "./pages/FlatbedTransport";
import FleetTransport from "./pages/FleetTransport";
import DealershipDelivery from "./pages/DealershipDelivery";
import AutoAuctionShipping from "./pages/AutoAuctionShipping";
import RentalCarLogistics from "./pages/RentalCarLogistics";
import OEMTransport from "./pages/OEMTransport";
import TrackShipment from "./pages/TrackShipment";
import Blog from "./pages/Blog";
import Quote from "./pages/Quote";
import CaliforniaShipping from "./pages/CaliforniaShipping";
import LosAngelesShipping from "./pages/LosAngelesShipping";
import PurgeCache from "./pages/PurgeCache";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 24 * 60 * 60 * 1000, // 3 days - data considered fresh
      gcTime: 3 * 24 * 60 * 60 * 1000, // 3 days - keep cached data when unmounted
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/open-transport" element={<OpenTransport />} />
            <Route path="/enclosed-transport" element={<EnclosedTransport />} />
            <Route path="/heavy-hauling" element={<HeavyHauling />} />
            <Route path="/flatbed-transport" element={<FlatbedTransport />} />
            <Route path="/fleet-transport" element={<FleetTransport />} />
            <Route path="/dealership-delivery" element={<DealershipDelivery />} />
            <Route path="/auto-auction-shipping" element={<AutoAuctionShipping />} />
            <Route path="/rental-car-logistics" element={<RentalCarLogistics />} />
            <Route path="/oem-transport" element={<OEMTransport />} />
            <Route path="/track" element={<TrackShipment />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/california-car-shipping" element={<CaliforniaShipping />} />
            <Route path="/los-angeles-car-shipping" element={<LosAngelesShipping />} />
            <Route path="/purge-cache" element={<PurgeCache />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
