import { MOCK_USERS } from '../data/mockData';

export const authService = {
    login: async (email: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user = MOCK_USERS.find(u => u.email === email);
        
        if (user) localStorage.setItem('user', JSON.stringify(user));

        return user || null;
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    }
};