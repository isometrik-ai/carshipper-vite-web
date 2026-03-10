import { DEFAULT_COUNTRY_CODE, DEFAULT_CURRENCY_SYMBOl, MAIN_API_URL } from "@/lib/config";
import axiosInstance from "./axios-base";


const getUrl = (endpoint:string) => MAIN_API_URL + endpoint;

const commonHeader = {
    "Content-Type": "application/json",
    language: "en",
    currencycode: DEFAULT_COUNTRY_CODE,
    currencysymbol: DEFAULT_CURRENCY_SYMBOl,
    platform: "3",
};
export const postWithToken = async (
    endpoint:string,
    data:object,
    otherHeaders = {},
    isCustomURL:string,
    signal?: AbortSignal
  ) => {
    return axiosInstance.post(isCustomURL || getUrl(endpoint), data, {
      headers: { ...commonHeader, ...otherHeaders },
      signal
    });
};

export const getWithToken = async (endpoint: string, otherHeaders = {}, isCustomURL?:string, signal?: AbortSignal
) => {
  const finalUrl = isCustomURL ? isCustomURL + endpoint : getUrl(endpoint);
  
  return axiosInstance
    .get(finalUrl, {
      headers: { ...commonHeader, ...otherHeaders },
      signal
    })
    .catch(() => {});
};

// DELETE REQUEST
export const deleteRequest = async (endpoint: string, otherHeaders = {}, isCustomURL: string) => {
  return axiosInstance
      .delete(isCustomURL || getUrl(endpoint), {
          headers: { ...commonHeader, ...otherHeaders },
      })
      .catch((err) => {        
        return err
      });
};

// DELETE REQUEST WITH Payload
export const deleteRequestWithPayload = async (endpoint: string, data: object, otherHeaders: object) => {
  return axiosInstance.delete(getUrl(endpoint), {
    headers: { ...commonHeader, ...otherHeaders },
    data,
  }).catch((err) => {        
    return err
  });
};
// PATCH REQUEST
export const patchRequest = async (
  endpoint: string,
  data: object,
  otherHeaders = {},
  isCustomURL: string
) => {
  return axiosInstance.patch(isCustomURL || getUrl(endpoint), data, {
      headers: { ...commonHeader, ...otherHeaders },
  }).catch((err)=>{
    return err
  });
};