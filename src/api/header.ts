import { apiClient } from "@/lib/axios";
import { HeaderResponse } from "@/types/header.types";

const ENDPOINT = "/api/global?populate[header][populate][navLinks][populate]=*";

export const getHeader = async (): Promise<HeaderResponse> => {
    try {
        const { data } = await apiClient.get<HeaderResponse>(
            ENDPOINT
        );
        return data;
    } catch (error) {
        console.error("Failed to fetch header:", error);
        throw new Error("Unable to load header data.");
    }
};
