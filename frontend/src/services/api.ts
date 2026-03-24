import { axiosClient } from '../lib/axios';

export async function apiFetch<T>(url: string): Promise<T> {
    const response = await axiosClient.get<T>(url);
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