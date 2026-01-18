import { apiGet } from "./client";

export const getHomePageData = () => apiGet("home?populate=*");
