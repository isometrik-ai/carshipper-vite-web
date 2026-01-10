import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

// --- TypeScript Interfaces based on your JSON ---
interface TermsSeo {
  id: number;
  title: string;
  name: string | null;
  content: string;
  rel: string | null;
  href: string;
}

interface TermsSection {
  id: number;
  title: string;
  content: BlocksContent;
}

interface TermsData {
  page_title: string;
  last_updated: string;
  terms_conditions: TermsSeo; // Matches your "terms_conditions" object
  terms_conditions_section: TermsSection[]; // Matches your "terms_conditions_section" array
}

const Terms = () => {
  const [termsData, setTermsData] = useState<TermsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/terms-of-service?populate=*");
        // Strapi v5 directly returns the fields in response.data.data
        setTermsData(response.data.data);
      } catch (error) {
        console.error("Error fetching Terms of Service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!termsData) return null;

  const seo = termsData.terms_conditions;

  return (
    <>
      <Helmet>
        <title>{seo?.title || "Terms of Service | CarShippers.ai"}</title>
        <meta name="description" content={seo?.content} />
        <link rel="canonical" href={seo?.href} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h1>{termsData.page_title}</h1>
              <p className="text-muted-foreground">{termsData.last_updated}</p>

              {/* Dynamic Sections */}
              {termsData.terms_conditions_section?.map((section) => (
                <div key={section.id} className="">
                  <h2 className="font-semibold">{section.title}</h2>

                  <BlocksRenderer content={section.content} />
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Terms;