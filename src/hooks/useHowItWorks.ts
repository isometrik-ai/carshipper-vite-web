import { HowItWorksResponse } from "@/types/how-it-works.types";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:1337";

export const useHowItWorks = () => {
  const [howItWorks, setHowItWorks] = useState<HowItWorksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHowItWorks = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<HowItWorksResponse>(
          `${API_BASE_URL}/api/how-it-works?populate=*`
        );
        setHowItWorks(data);
        setError(null);
      } catch (err) {
        console.error("How It Works API Error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchHowItWorks();
  }, []);

  return { howItWorks, loading, error };
};
