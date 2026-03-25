import { apiRequest } from "./client";

export const getHomePageData = () => apiRequest("home?populate=*");
