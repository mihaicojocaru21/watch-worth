import { MOCK_USERS } from '../data/mockData';

export const authService = {
    login: async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const user = MOCK_USERS.find(
            u => u.email === email && u.password === password
        );

        if (user) {
            const { password: _pw, ...safeUser } = user;
            void _pw;
            localStorage.setItem('user', JSON.stringify(safeUser));
            return safeUser;
        }

        return null;
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    },
};