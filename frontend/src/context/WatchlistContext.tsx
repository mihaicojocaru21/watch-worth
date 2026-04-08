import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { apiFetch, apiPost, apiDelete } from '../services/api';

interface WatchlistContextType {
    watchlist:      number[];
    isInWatchlist:  (id: number) => boolean;
    toggleWatchlist:(id: number, title?: string) => Promise<void>;
    clearWatchlist: () => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | null>(null);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState<number[]>([]);

    useEffect(() => {
        if (!user) { setWatchlist([]); return; }
        apiFetch<number[]>('/watchlist')
            .then(ids => setWatchlist(ids))
            .catch(() => setWatchlist([]));
    }, [user]);

    const isInWatchlist = useCallback(
        (id: number) => watchlist.includes(id),
        [watchlist]
    );

    const toggleWatchlist = useCallback(
        async (id: number, title?: string) => {
            if (!user) return;
            const wasIn = watchlist.includes(id);
            try {
                if (wasIn) {
                    await apiDelete(`/watchlist/${id}`);
                } else {
                    await apiPost<undefined, unknown>(`/watchlist/${id}`, undefined);
                }
                const refreshed = await apiFetch<number[]>('/watchlist');
                setWatchlist(refreshed);

                if (wasIn) {
                    toast.info(title ? `"${title}" removed from watchlist` : 'Removed from watchlist', {
                        icon: '🗑️',
                        autoClose: 2000,
                    });
                } else {
                    toast.success(title ? `"${title}" added to watchlist` : 'Added to watchlist', {
                        icon: '❤️',
                        autoClose: 2000,
                    });
                }
            } catch {
                toast.error('Could not update watchlist. Please try again.');
            }
        },
        [user, watchlist]
    );

    const clearWatchlist = useCallback(async () => {
        if (!user) return;
        try {
            await apiDelete('/watchlist');
            setWatchlist([]);
            toast.info('Watchlist cleared', { icon: '🗑️', autoClose: 2000 });
        } catch {
            toast.error('Could not clear watchlist. Please try again.');
        }
    }, [user]);

    return (
        <WatchlistContext.Provider value={{ watchlist, isInWatchlist, toggleWatchlist, clearWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const ctx = useContext(WatchlistContext);
    if (!ctx) throw new Error('useWatchlist must be used within a WatchlistProvider');
    return ctx;
};