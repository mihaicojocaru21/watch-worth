import axios, { AxiosError } from 'axios';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5052/api';

export const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('watchworth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;

        if (status === 401) window.location.href = '/login';
        else if (status === 403) window.location.href = '/forbidden';
        else if (status && status >= 500) window.location.href = '/server-error';

        return Promise.reject(error);
    }
);