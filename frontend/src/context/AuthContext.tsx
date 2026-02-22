// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types';

// Definim ce date ținem minte
interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const savedUser = authService.getCurrentUser();
        if (savedUser) setUser(savedUser);
    }, []);

    const login = async (email: string) => {
        const foundUser = await authService.login(email);
        if (foundUser) {
            setUser(foundUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);