import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SEO_FALLBACKS, SEO_SITE } from "@/constants/seo";
import { QueryProvider } from "@/providers/QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
  loading: () => null,
});
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SEO_SITE.url),
  title: SEO_FALLBACKS.global.title,
  description: SEO_FALLBACKS.global.description,
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
            <ErrorBoundary>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1" role="main" aria-label="Main content">
                  {children}
                </main>
                <Footer />
                <ChatWidget />
              </div>
            </ErrorBoundary>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

