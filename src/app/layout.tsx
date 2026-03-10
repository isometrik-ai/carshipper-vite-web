import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarShippers.ai | Ship Your Car in 30 Seconds | Instant Auto Transport Quotes",
  description:
    "Get an instant car shipping quote in 30 seconds. Licensed carriers, door-to-door service, no hidden fees. Ship your car anywhere in the US with CarShippers.ai.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
       <Script id="google-maps-init" strategy="beforeInteractive">
        {`
          (function () {
            window.initGoogleMaps = function () {
              window.googleMapsLoaded = true;
              if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("google-maps-loaded"));
              }
            };
            if (
              typeof window !== "undefined" &&
              window.google &&
              window.google.maps &&
              window.google.maps.places
            ) {
              window.googleMapsLoaded = true;
              window.dispatchEvent(new Event("google-maps-loaded"));
            }
          })();
        `}
      </Script>

      <Script
        id="google-maps-script"
        strategy="beforeInteractive"
        src={
          `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}` +
          "&libraries=places&callback=initGoogleMaps&loading=async"}
        async
        defer
      />
        <QueryProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1" role="main" aria-label="Main content">
                {children}
              </main>
              <Footer />
              <ChatWidget />
            </div>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

