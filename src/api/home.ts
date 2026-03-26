import { apiRequest } from "./client";

export const getHomePageData = async () => {
    try {
      const data = await apiRequest("home?populate=*" );
      return data;
    } catch (error) {
      // Handle error appropriately, e.g., log or rethrow
      throw new Error(`Failed to fetch home page data: ${error.message}`);
    }
  };
