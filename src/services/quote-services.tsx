import { CREATE_LEAD, CREATE_NEW_QUOTE, GET_QUOTE_DETAILS, UPDATE_QUOTE, VIN_NUMBER_DETAILS } from "@/lib/api.endpoint-constants";
import { getWithToken, patchWithToken, postWithToken } from "./axios-request";

export const CreateNewQuotePostAPI = async (
    payload: any,
    signal?: AbortSignal
  ) => {
    try {
      const endpoint = CREATE_LEAD;
      const response = await postWithToken(endpoint, payload, {}, '', signal);
      return response?.data;
    } catch (error) {
      return error;
    }
};

export const QuoteGetDetailsAPI = async (
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

export const UpdateQuote = async (payload: any) => {
  try {
    const endpoint = UPDATE_QUOTE;
    const response = await patchWithToken(
      endpoint,
      payload,
      { "Content-Type": "application/json" },
      ""
    );
    return (response as any)?.data ?? response;
  } catch (error) {
    console.error('Error updating quote:', error);
    return { success: false, error };
  }
};