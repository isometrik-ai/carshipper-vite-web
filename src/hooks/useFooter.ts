import { useEffect, useState } from "react";
import { getFooter } from "@/api/footer";
import { FooterData } from "@/types/footer.types";

export const useFooter = () => {
    const [footer, setFooter] = useState<FooterData | null>(null);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const response = await getFooter();
                setFooter(response.data);
            } catch (error) {
                console.error("Error loading footer:", error);
            }
        };

        fetchFooter();
    }, []);

    return footer;
};
