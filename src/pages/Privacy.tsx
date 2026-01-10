import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

// Define TypeScript interfaces
interface PrivacySeo {
  title: string;
  name: string;
  content: string;
  rel: string;
  href: string;
}

interface PolicySection {
  id: number;
  title: string;
  content: BlocksContent;
}

interface PrivacyData {
  page_title: string;
  last_updated: string;
  privacySeo: PrivacySeo[];
  policy_section: PolicySection[];
}

const Privacy = () => {
  const [privacyData, setPrivacyData] = useState<PrivacyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching with populate=* to get components and SEO data
        const response = await axios.get("http://localhost:1337/api/privacy?populate=*");

        // Strapi v4/v5 wraps the response in a 'data' object
        // If it's a Single Type, it usually looks like response.data.data.attributes
        // Depending on your Strapi version, you may need to adjust this path:
        const extractedData = response.data.data.attributes || response.data.data;

        setPrivacyData(extractedData);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!privacyData) return <div className="min-h-screen flex items-center justify-center">No data found.</div>;

  // Extract SEO data safely
  const seo = privacyData.privacySeo?.[0];

  return (
    <>
      <Helmet>
        <title>{seo?.title || "Privacy Policy | CarShippers.ai"}</title>
        <meta name="description" content={seo?.content || "CarShippers.ai Privacy Policy"} />
        <link rel="canonical" href={seo?.href || "https://carshippers.ai/privacy"} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h1>{privacyData.page_title}</h1>
              <p className="text-muted-foreground">{privacyData.last_updated}</p>

              {privacyData.policy_section?.map((section) => (
                <div key={section.id}>
                  <h2>{section.title}</h2>
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

export default Privacy;