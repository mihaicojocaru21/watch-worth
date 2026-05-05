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
    async (error: AxiosError) => {
        const originalRequest = error.config as any;
        const status = error.response?.status;
        const url = originalRequest?.url;

        const isLoginEndpoint = url?.split('?')[0] === '/auth/login';

        // If we get a 401, it's not the login endpoint, and we haven't retried yet
        if (status === 401 && !isLoginEndpoint && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true; // Mark as retried to prevent infinite loops

            try {
                // Call the refresh endpoint (must include withCredentials to send the cookie)
                const { data } = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                // Save the new token
                localStorage.setItem('watchworth_token', data.token);

                // Update the failed request with the new token and retry it
                originalRequest.headers.Authorization = `Bearer ${data.token}`;
                return axiosClient(originalRequest);

            } catch (refreshError) {
                // If the refresh token is also expired, log the user out
                localStorage.removeItem('watchworth_token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        if (status === 403) window.location.href = '/forbidden';
        else if (status && status >= 500) window.location.href = '/error';

        return Promise.reject(error);
    }
);