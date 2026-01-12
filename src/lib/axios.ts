/**
 * Centralized API client using native fetch
 * This instance is used by React Query for all API calls
 */

const BASE_URL = import.meta.env.VITE_API_URL;

interface RequestConfig extends RequestInit {
    timeout?: number;
}

/**
 * Custom fetch wrapper with timeout and error handling
 */
const fetchWithTimeout = async (
    url: string,
    options: RequestConfig = {}
): Promise<Response> => {
    const { timeout = 30000, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === "AbortError") {
            throw new Error("Request timeout");
        }
        throw error;
    }
};

/**
 * API client wrapper that handles base URL, headers, and error handling
 */
export const apiClient = {
    get: async <T>(url: string, config?: RequestConfig): Promise<{ data: T }> => {
        try {
            const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
            const response = await fetchWithTimeout(fullUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...config?.headers,
                },
                ...config,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("API Error:", response.status, errorData);
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return { data };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Network Error:", error.message);
                throw error;
            }
            throw new Error("Unknown error occurred");
        }
    },

    post: async <T>(url: string, data?: unknown, config?: RequestConfig): Promise<{ data: T }> => {
        try {
            const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
            const response = await fetchWithTimeout(fullUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...config?.headers,
                },
                body: data ? JSON.stringify(data) : undefined,
                ...config,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("API Error:", response.status, errorData);
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json();
            return { data: responseData };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Network Error:", error.message);
                throw error;
            }
            throw new Error("Unknown error occurred");
        }
    },

    put: async <T>(url: string, data?: unknown, config?: RequestConfig): Promise<{ data: T }> => {
        try {
            const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
            const response = await fetchWithTimeout(fullUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...config?.headers,
                },
                body: data ? JSON.stringify(data) : undefined,
                ...config,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("API Error:", response.status, errorData);
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json();
            return { data: responseData };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Network Error:", error.message);
                throw error;
            }
            throw new Error("Unknown error occurred");
        }
    },

    delete: async <T>(url: string, config?: RequestConfig): Promise<{ data: T }> => {
        try {
            const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
            const response = await fetchWithTimeout(fullUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...config?.headers,
                },
                ...config,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("API Error:", response.status, errorData);
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json().catch(() => ({}));
            return { data: responseData };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Network Error:", error.message);
                throw error;
            }
            throw new Error("Unknown error occurred");
        }
    },
};
