// frontend/src/services/api.ts
import { axiosClient } from '../lib/axios';

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: string;
}

export async function apiFetch<T>(url: string, options?: FetchOptions): Promise<T> {
    const method = options?.method ?? 'GET';
    const data   = options?.body ? JSON.parse(options.body) : undefined;

    const response = await axiosClient.request<T>({ method, url, data });
    return response.data;
}

export async function apiPost<TReq, TRes>(url: string, body: TReq): Promise<TRes> {
    const response = await axiosClient.post<TRes>(url, body);
    return response.data;
}

export async function apiPut<TReq, TRes>(url: string, body: TReq): Promise<TRes> {
    const response = await axiosClient.put<TRes>(url, body);
    return response.data;
}

export async function apiDelete(url: string): Promise<void> {
    await axiosClient.delete(url);
}