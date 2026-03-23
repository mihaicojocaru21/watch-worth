export const API_BASE = 'http://localhost:3000/api';

export const authHeaders = (): HeadersInit => {
    const token = localStorage.getItem('watchworth_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export async function apiFetch<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            ...authHeaders(),
            ...(options?.headers ?? {}),
        },
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err?.error ?? `HTTP ${res.status}`);
    }
    
    if (res.status === 204) return undefined as T;

    return res.json() as Promise<T>;
}