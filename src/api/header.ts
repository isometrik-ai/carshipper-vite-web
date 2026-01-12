import axios from "axios";
import { HeaderResponse } from "@/types/header.types";

const baseUrl = import.meta.env.VITE_API_URL

export const getHeader = async (): Promise<HeaderResponse> => {
    try {
        const { data } = await axios.get<HeaderResponse>(
            `${baseUrl}/api/global?populate[header][populate][navLinks][populate]=*`
        );
        return data;
    } catch (error) {
        console.error("Failed to fetch header:", error);
        throw new Error("Unable to load header data.");
    }
};
