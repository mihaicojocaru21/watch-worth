import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types';

interface AuthContextType {
    user: Omit<User, 'password'> | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (username: string, email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const savedUser = authService.getCurrentUser();
            if (savedUser) setUser(savedUser);
        } catch (err) {
            console.error('[AuthContext] Failed to restore session:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const foundUser = await authService.login(email, password);
        if (foundUser) {
            setUser(foundUser);
            return true;
        }
        return false;
    };

    const register = async (username: string, email: string, password: string) => {
        const { user: newUser, error } = await authService.register(username, email, password);
        if (newUser) {
            setUser(newUser);
            return { success: true, error: null };
        }
        return { success: false, error };
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
};