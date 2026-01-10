import { HeroSectionResponse } from "@/types/hero.types";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:1337";

export const useHeroSection = () => {
    const [hero, setHero] = useState<HeroSectionResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHeroSection = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get<HeroSectionResponse>(
                    `${API_BASE_URL}/api/hero-section?populate=*`
                );
                setHero(data);
                setError(null);
            } catch (err) {
                console.error("Hero API Error:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchHeroSection();
    }, []);

    return { hero, loading, error };
};
