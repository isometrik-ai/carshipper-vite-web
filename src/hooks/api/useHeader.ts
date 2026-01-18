import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { HEADER_ENDPOINT } from "@/constants/apiConstants";

interface HeaderResponse {
    data: {
        logoText: string;
        logoHighlight: string;
        logoIconName: string;
        navLinks: Array<{
            id: number;
            label: string;
            href: string;
        }>;
        headerCTA: {
            iconName: string;
            phoneHref: string;
            phoneText: string;
            buttonLabel: string;
        };
    };
}

const fetchHeader = async () => {
    const { data } = await apiClient.get<HeaderResponse>(HEADER_ENDPOINT);
    return data;
};

export const useHeader = () => {
    return useQuery({
        queryKey: ["header"],
        queryFn: fetchHeader,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    });
};
