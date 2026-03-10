import { CREATE_NEW_QUOTE, GET_QUOTE_DETAILS, VIN_NUMBER_DETAILS } from "@/lib/api.endpoint-constants";
import { getWithToken, postWithToken } from "./axios-request";

export const CreateNewQuotePostAPI = async (
    payload: any,
    signal?: AbortSignal
  ) => {
    try {
      const endpoint = CREATE_NEW_QUOTE;
      const response = await postWithToken(endpoint, payload, {}, '', signal);
      return response?.data;
    } catch (error) {
      return error;
    }
};

export const QuoteGetDetailsPostAPI = async (
  quoteId: string,
  signal?: AbortSignal
) => {
  try {
    const endpoint = GET_QUOTE_DETAILS;
    const response = await getWithToken(endpoint + '/' + quoteId, {}, '', signal);
    return response;
  } catch (error) {
    return error;
  }
};

export const VinNumberDetails = async (
  payload: any,
  signal?: AbortSignal
) => {
  try {
    const endpoint = VIN_NUMBER_DETAILS;
    const response = await postWithToken(endpoint, payload, {}, '', signal);
    return response?.data;
  } catch (error) {
    return error;
  }
};