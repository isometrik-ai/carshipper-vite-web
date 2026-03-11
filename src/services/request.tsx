import axiosInstance from "./axios-base";
import { API_BASE_URL } from "@/lib/config";

/**
 * Base helpers for API requests.
 * Centralize URL building and common headers so calling code stays clean.
 */

const getUrl = (endpoint: string): string => `${API_BASE_URL}${endpoint}`;
const getImageUrl = (endpoint: string): string => `${API_BASE_URL}${endpoint}`;

// Default headers for JSON APIs
const commonHeader: Record<string, string> = {
  "Content-Type": "application/json",
};

// Default headers for multipart / file upload APIs
const commonHeaderImage: Record<string, string> = {
  "Content-Type": "multipart/form-data",
};

/**
 * POST with metadata token (added by axios interceptor) and JSON body.
 */
export const postWithToken = async (
  endpoint: string,
  data: object,
  otherHeaders: Record<string, string> = {},
  isCustomURL?: string,
  signal?: AbortSignal
) => {
  const url = isCustomURL || getUrl(endpoint);

  return axiosInstance.post(url, data, {
    headers: { ...commonHeader, ...otherHeaders },
    signal,
  });
};

/**
 * POST for image / file uploads with metadata token.
 */
export const postImageWithToken = async (
  endpoint: string,
  data: object,
  otherHeaders: Record<string, string> = {},
  isCustomURL?: string,
  signal?: AbortSignal
) => {
  const url = isCustomURL || getImageUrl(endpoint);

  return axiosInstance.post(url, data, {
    headers: { ...commonHeaderImage, ...otherHeaders },
    signal,
  });
};

/**
 * GET request helper.
 */
export const get = async (
  endpoint: string,
  otherHeaders: Record<string, string> = {},
  isCustomURL?: string,
  signal?: AbortSignal
) => {
  const finalUrl = isCustomURL ? `${isCustomURL}${endpoint}` : getUrl(endpoint);

  return axiosInstance.get(finalUrl, {
    headers: { ...commonHeader, ...otherHeaders },
    signal,
  });
};

/**
 * DELETE request (no payload).
 */
export const deleteRequest = async (
  endpoint: string,
  otherHeaders: Record<string, string> = {},
  isCustomURL?: string
) => {
  const url = isCustomURL || getUrl(endpoint);

  return axiosInstance.delete(url, {
    headers: { ...commonHeader, ...otherHeaders },
  });
};

/**
 * DELETE request with JSON payload.
 */
export const deleteRequestWithPayload = async (
  endpoint: string,
  data: object,
  otherHeaders: Record<string, string> = {}
) => {
  const url = getUrl(endpoint);

  return axiosInstance.delete(url, {
    headers: { ...commonHeader, ...otherHeaders },
    data,
  });
};

/**
 * PATCH request with JSON body.
 */
export const patchRequest = async (
  endpoint: string,
  data: object,
  otherHeaders: Record<string, string> = {},
  isCustomURL?: string
) => {
  const url = isCustomURL || getUrl(endpoint);

  return axiosInstance.patch(url, data, {
    headers: { ...commonHeader, ...otherHeaders },
  });
};