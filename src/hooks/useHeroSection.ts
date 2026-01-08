import { HeroSectionResponse } from "@/types/hero.types";
import { useEffect, useState } from "react";

export const useHeroSection = () => {
    const [hero, setHero] = useState<HeroSectionResponse | null>(null);

    useEffect(() => {
        const fetchHeroSection = async () => {
            try {
                const res = await fetch("http://localhost:1337/api/hero-section?populate=*");
                const data = await res.json();
                setHero(data);
            } catch (err) {
                console.error("Hero API Error:", err);
            }
        };

        fetchHeroSection();
    }, []);

    return { hero };
};
