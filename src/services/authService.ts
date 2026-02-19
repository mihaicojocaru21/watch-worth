import { MOCK_USERS } from '../data/mockData';

export const authService = {
    login: async (email: string) => {
        // Simulam o mică pauză de 0.5 secunde
        await new Promise(resolve => setTimeout(resolve, 500));

        // Caută userul
        const user = MOCK_USERS.find(u => u.email === email);

        // Dacă există, îl salvăm în memoria browserului
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