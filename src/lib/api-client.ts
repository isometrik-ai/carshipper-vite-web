/**
 * Enhanced API client: timeout, retry, and structured errors.
 */

import { ApiError, HttpError, NetworkError, TimeoutError, isRetryableError } from "./api-errors";

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_RETRIES = 2;
const RETRY_DELAY_MS = 1_000;

export type ApiClientOptions = {
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    return res;
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") {
      throw new TimeoutError(`Request timed out after ${timeoutMs}ms`, url);
    }
    throw new NetworkError("Network request failed", url, e);
  } finally {
    clearTimeout(id);
  }
}

async function handleResponse(response: Response, url: string): Promise<unknown> {
  const text = await response.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!response.ok) {
    throw new HttpError(
      response.statusText || `HTTP ${response.status}`,
      response.status,
      response.statusText,
      url,
      body
    );
  }
  return body;
}

/**
 * Enhanced fetch: timeout, retries for 5xx/network/timeout, throws ApiError subclasses.
 */
export async function apiRequest<T = unknown>(
  url: string,
  init: RequestInit = {},
  options: ApiClientOptions = {}
): Promise<T> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, retries = DEFAULT_RETRIES, retryDelayMs = RETRY_DELAY_MS } = options;
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, init, timeoutMs);
      const data = await handleResponse(response, url);
      return data as T;
    } catch (e) {
      lastError = e;
      if (attempt < retries && isRetryableError(e)) {
        await delay(retryDelayMs * (attempt + 1));
        continue;
      }
      throw e;
    }
  }
  throw lastError ?? new ApiError("Request failed");
}
