import { GET_PRICING_RULES } from "@/lib/api.endpoint-constants";
import { getWithToken } from "./axios-request";

export const getAllActivePricingRulesList = async (params: string) => {
    try {
      const endpoint = `${GET_PRICING_RULES}?active_only=true`;
      const response = await getWithToken(endpoint, {}, '');
      return response;
    } catch (error) {
      return error;
    }
  };