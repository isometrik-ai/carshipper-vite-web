import axios from "axios";
import { FooterResponse } from "@/types/footer.types";

const baseUrl = import.meta.env.VITE_API_URL;

export const getFooter = async (): Promise<FooterResponse> => {
    const res = await axios.get(
        `${baseUrl}/api/footer?populate[footerNavigationGroup][populate]=*&populate[footerLinkGroups][populate]=*&populate[bottomLinks]=*`
    );

    return res.data;
};
