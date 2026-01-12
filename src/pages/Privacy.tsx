import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import { usePrivacy } from "@/hooks/api/usePrivacy";

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

const Privacy = () => {
  const { data: privacyData, isLoading, error } = usePrivacy();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error || !privacyData) return <div className="min-h-screen flex items-center justify-center">No data found.</div>;

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