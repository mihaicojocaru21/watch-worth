import { axiosClient } from '../lib/axios';

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: string;
}

export async function apiFetch<T>(url: string, options?: RequestOptions): Promise<T> {
    const method = options?.method ?? 'GET';
    const data   = options?.body ? JSON.parse(options.body) : undefined;

    let response;
    switch (method) {
        case 'POST':   response = await axiosClient.post<T>(url, data);   break;
        case 'PUT':    response = await axiosClient.put<T>(url, data);    break;
        case 'PATCH':  response = await axiosClient.patch<T>(url, data);  break;
        case 'DELETE': response = await axiosClient.delete<T>(url);       break;
        default:       response = await axiosClient.get<T>(url);
    }
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