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

    logout: () => {
        localStorage.removeItem('watchworth_token');
        localStorage.removeItem('user');
    },

    getCurrentUser: (): SafeUser | null => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    },
};