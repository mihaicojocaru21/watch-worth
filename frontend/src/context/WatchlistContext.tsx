import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

interface WatchlistContextType {
    watchlist: number[];
    isInWatchlist: (id: number) => boolean;
    toggleWatchlist: (id: number) => void;
    clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType>(null!);

const storageKey = (userId: number | undefined) =>
    userId ? `watchworth_watchlist_${userId}` : null;

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState<number[]>([]);

    // Load the correct watchlist whenever the logged-in user changes
    useEffect(() => {
        const key = storageKey(user?.id);
        if (!key) {
            setWatchlist([]);
            return;
        }
        try {
            const saved = localStorage.getItem(key);
            setWatchlist(saved ? JSON.parse(saved) : []);
        } catch {
            setWatchlist([]);
        }
    }, [user?.id]);

    // Persist to localStorage on every change (only when logged in)
    useEffect(() => {
        const key = storageKey(user?.id);
        if (!key) return;
        localStorage.setItem(key, JSON.stringify(watchlist));
    }, [watchlist, user?.id]);

    const isInWatchlist = useCallback((id: number) => watchlist.includes(id), [watchlist]);

    const toggleWatchlist = useCallback((id: number) => {
        if (!user) return; // silently ignore if not logged in
        setWatchlist(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    }, [user]);

    const clearWatchlist = useCallback(() => {
        if (!user) return;
        setWatchlist([]);
    }, [user]);

    return (
        <WatchlistContext.Provider value={{ watchlist, isInWatchlist, toggleWatchlist, clearWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);