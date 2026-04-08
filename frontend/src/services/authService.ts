// frontend/src/services/authService.ts
import { apiPost } from './api';

interface SafeUser {
    id: number;
    username: string;
    email: string;
    role: string;
}

interface LoginResponse {
    token: string;
    user: SafeUser;
}

export const authService = {
    login: async (email: string, password: string): Promise<SafeUser | null> => {
        try {
            const data = await apiPost<{ email: string; password: string }, LoginResponse>(
                '/auth/login',
                { email, password }
            );

            localStorage.setItem('watchworth_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return data.user;
        } catch {
            return null;
        }
    },

    register: async (username: string, email: string, password: string): Promise<{ user: SafeUser | null; error: string | null }> => {
        try {
            const data = await apiPost<{ username: string; email: string; password: string }, LoginResponse>(
                '/auth/register',
                { username, email, password }
            );

            localStorage.setItem('watchworth_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return { user: data.user, error: null };
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message
                ?? 'Registration failed.';
            return { user: null, error: message };
        }
    },

    logout: () => {
        localStorage.removeItem('watchworth_token');
        localStorage.removeItem('user');
    },

    getCurrentUser: (): SafeUser | null => {
        const saved = localStorage.getItem('user');
        if (!saved) return null;
        try {
            return JSON.parse(saved);
        } catch {
            localStorage.removeItem('user');
            return null;
        }
    },
};