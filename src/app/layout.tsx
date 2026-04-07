import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SEO_FALLBACKS, SEO_SITE } from "@/constants/seo";
import { QueryProvider } from "@/providers/QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/Header"));
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

