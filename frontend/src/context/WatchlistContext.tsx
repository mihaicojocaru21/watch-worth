import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { apiFetch, apiPost, apiDelete } from '../services/api';

interface WatchlistContextType {
    watchlist: number[];
    isInWatchlist: (id: number) => boolean;
    toggleWatchlist: (id: number) => Promise<void>;
    clearWatchlist: () => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | null>(null);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState<number[]>([]);

    useEffect(() => {
        if (!user) {
            setWatchlist([]);
            return;
        }

        apiFetch<number[]>('/watchlist')
            .then((ids) => setWatchlist(ids))
            .catch(() => setWatchlist([]));
    }, [user?.id]);

    const isInWatchlist = useCallback(
        (id: number) => watchlist.includes(id),
        [watchlist]
    );

    const toggleWatchlist = useCallback(
        async (id: number) => {
            if (!user) return;

            try {
                if (watchlist.includes(id)) {
                    await apiDelete(`/watchlist/${id}`);
                } else {
                    await apiPost<undefined, unknown>(`/watchlist/${id}`, undefined);
                }

                const refreshed = await apiFetch<number[]>('/watchlist');
                setWatchlist(refreshed);
            } catch {
                // ignore
            }
        },
        [user, watchlist]
    );

    const clearWatchlist = useCallback(async () => {
        if (!user) return;
        try {
            await apiDelete('/watchlist');
            setWatchlist([]);
        } catch {
            // ignore
        }
    }, [user]);

    return (
        <WatchlistContext.Provider
            value={{ watchlist, isInWatchlist, toggleWatchlist, clearWatchlist }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const ctx = useContext(WatchlistContext);
    if (!ctx) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return ctx;
};