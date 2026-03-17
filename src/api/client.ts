import { apiRequest, type ApiClientOptions } from "@/lib/api-client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultOptions: ApiClientOptions = {
  timeoutMs: 15_000,
  retries: 2,
  retryDelayMs: 1_000,
};

export async function apiGet<T = unknown>(endpoint: string, options?: ApiClientOptions): Promise<T> {
  const url = `${API_URL}/api/${endpoint}`;
  return apiRequest<T>(url, { method: "GET" }, { ...defaultOptions, ...options });
}
