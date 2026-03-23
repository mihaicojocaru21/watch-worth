import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>(null!);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('watchworth_theme');
        return saved ? saved === 'dark' : true; // default: dark
    });

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('watchworth_theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    // Apply on mount to avoid flash
    useEffect(() => {
        const saved = localStorage.getItem('watchworth_theme') ?? 'dark';
        document.documentElement.setAttribute('data-theme', saved);
    }, []);

    const toggleTheme = () => setIsDark(p => !p);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);