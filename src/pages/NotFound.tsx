import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNotFound } from "@/hooks/api/useNotFound";

interface HomeLink {
  id: number;
  label: string;
  href: string;
}

interface NotFoundData {
  status_code: string;
  status_message: string | null;
  home_link: HomeLink;
}

const NotFound = () => {
  const location = useLocation();
  const { data, isLoading, error } = useNotFound();

  // Existing effect for logging 404 errors
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  if (isLoading || error) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        {/* Dynamic Status Code (e.g., 404) */}
        <h1 className="mb-4 text-4xl font-bold">
          {data?.status_code || "404"}
        </h1>

        {/* Dynamic Status Message */}
        <p className="mb-4 text-xl text-muted-foreground">
          {data?.status_message || "Oops! Page not found"}
        </p>

        {/* Dynamic Home Link */}
        <a
          href={data?.home_link.href || "/"}
          className="text-primary underline hover:text-primary/90"
        >
          {data?.home_link.label || "Return to Home"}
        </a>
      </div>
    </div>
  );
};

export default NotFound;