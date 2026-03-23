// frontend/src/context/WatchlistContext.tsx

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { apiFetch } from '../services/api';

interface WatchlistContextType {
    watchlist: number[];
    isInWatchlist: (id: number) => boolean;
    toggleWatchlist: (id: number) => void;
    clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType>(null!);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState<number[]>([]);

    // Încarcă watchlist-ul din API când utilizatorul se loghează
    useEffect(() => {
        if (!user) {
            setWatchlist([]);
            return;
        }

        apiFetch<number[]>('/watchlist')
            .then(ids => setWatchlist(ids))
            .catch(() => setWatchlist([]));
    }, [user?.id]);

    const isInWatchlist = useCallback(
        (id: number) => watchlist.includes(id),
        [watchlist]
    );

    const toggleWatchlist = useCallback(async (id: number) => {
        if (!user) return;

        if (watchlist.includes(id)) {
            try {
                const updated = await apiFetch<number[]>(`/watchlist/${id}`, {
                    method: 'DELETE',
                });
                setWatchlist(updated);
            } catch {
                // fallback optimistic revert — nu facem nimic
            }
        } else {
            // Adaugă în watchlist
            try {
                const updated = await apiFetch<number[]>(`/watchlist/${id}`, {
                    method: 'POST',
                });
                setWatchlist(updated);
            } catch {
                // ignore
            }
        }
    }, [user, watchlist]);

    const clearWatchlist = useCallback(async () => {
        if (!user) return;
        try {
            await apiFetch<number[]>('/watchlist', { method: 'DELETE' });
            setWatchlist([]);
        } catch {
            // ignore
        }
    }, [user]);

    return (
        <WatchlistContext.Provider value={{ watchlist, isInWatchlist, toggleWatchlist, clearWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);