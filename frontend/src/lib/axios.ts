// frontend/src/lib/axios.ts
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
        const url = error.config?.url; // Aflăm la ce URL s-a făcut request-ul

        // NU da redirect dacă 401 vine de la endpoint-ul de login
        const isLoginEndpoint = url?.split('?')[0] === '/auth/login';
        if (status === 401 && !isLoginEndpoint) {
            localStorage.removeItem('watchworth_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        else if (status === 403) window.location.href = '/forbidden';
        else if (status && status >= 500) window.location.href = '/error';

        return Promise.reject(error);
    }
);