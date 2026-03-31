import { LEADS_BASE_API_URL } from "@/lib/config";
import { getWithLeadsToken, getWithToken, postWithLeadsToken } from "./axios-request";
import { CREATE_NEW_CONTACT, CREATE_NEW_LEAD, GET_LEAD_DETAILS, GET_QUOTE_DETAILS } from "@/lib/api.endpoint-constants";

export const CreateNewContactPostAPI = async (
    payload: any,
    signal?: AbortSignal
  ) => {
    try {
      const endpoint = `${LEADS_BASE_API_URL}${CREATE_NEW_CONTACT}`;
      const response = await postWithLeadsToken('', payload, {}, endpoint, signal);
      return response?.data;
    } catch (error) {
      return error;
    }
};


export const CreateNewLeadPostAPI = async (
    payload: any,
    signal?: AbortSignal
  ) => {
    try {
      const endpoint = `${LEADS_BASE_API_URL}${CREATE_NEW_LEAD}`;
      const response = await postWithLeadsToken('', payload, {}, endpoint, signal);
      return response?.data;
    } catch (error) {
      return error;
    }
};

export const LeadsGetDetailsAPI = async (
    leadId: string,
    signal?: AbortSignal
  ) => {
    try {
      const endpoint = `${LEADS_BASE_API_URL}${GET_LEAD_DETAILS}/${leadId}`;
      const response = await getWithLeadsToken('', {}, endpoint, signal);
      return response;
    } catch (error) {
      return error;
    }
  };