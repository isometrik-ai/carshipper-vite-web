export const API_URL = import.meta.env.VITE_API_URL;

export async function apiGet(endpoint: string) {
    const res = await fetch(`${API_URL}/api/${endpoint}`);
    return res.json();
}
