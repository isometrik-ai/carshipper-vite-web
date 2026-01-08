import { useEffect, useState } from "react";
import { getHeader } from "@/api/header";
import { HeaderData } from "@/types/header.types";

export const useHeader = () => {
    const [header, setHeader] = useState<HeaderData | null>(null);

    useEffect(() => {
        const fetchHeader = async () => {
            try {
                const res = await getHeader();

                const headerData =
                    res.data?.header ??
                    null;

                setHeader(headerData);
            } catch (error) {
                console.error("Error loading header:", error);
            }
        };

        fetchHeader();
    }, []);

    return header;
};
