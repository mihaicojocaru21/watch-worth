import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Review } from '../types';
import { apiFetch } from '../services/api';

interface ReviewSummary {
    movieId:   number;
    count:     number;
    avgRating: number;
}

interface ReviewContextValue {
    reviews:      Review[];
    summaries:    Map<number, ReviewSummary>;
    loadReviews:  (movieId: number) => void;
    addReview:    (movieId: number, rating: number, text: string) => Promise<void>;
    updateReview: (reviewId: string, rating: number, text: string) => Promise<void>;
    deleteReview: (reviewId: string) => Promise<void>;
    getUserReview:(movieId: number, userId: number) => Review | undefined;
    getSummary:   (movieId: number) => ReviewSummary | undefined;
}

const ReviewContext = createContext<ReviewContextValue | null>(null);

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [reviews,   setReviews]   = useState<Review[]>([]);
    const [summaries, setSummaries] = useState<Map<number, ReviewSummary>>(new Map());

    // ── Load global summaries (for movie cards) ───────────────────────────────
    const loadSummaries = useCallback(async () => {
        try {
            const data = await apiFetch<ReviewSummary[]>('/reviews/summary');
            setSummaries(new Map(data.map(s => [s.movieId, s])));
        } catch (err) {
            console.error('[ReviewContext] Failed to load summaries:', err);
        }
    }, []);

    useEffect(() => {
        loadSummaries();
    }, [loadSummaries]);

    // ── Per-movie reviews ─────────────────────────────────────────────────────
    const loadReviews = useCallback((movieId: number) => {
        apiFetch<Review[]>(`/movies/${movieId}/reviews`)
            .then(data => setReviews(data))
            .catch(err => { console.error('[ReviewContext] Failed to load reviews:', err); setReviews([]); });
    }, []);

    const addReview = useCallback(async (movieId: number, rating: number, text: string) => {
        const newReview = await apiFetch<Review>(`/movies/${movieId}/reviews`, {
            method: 'POST',
            body: JSON.stringify({ rating, text }),
        });
        setReviews(prev => [newReview, ...prev]);
        await loadSummaries();
    }, [loadSummaries]);

    const updateReview = useCallback(async (reviewId: string, rating: number, text: string) => {
        const updated = await apiFetch<Review>(`/reviews/${reviewId}`, {
            method: 'PUT',
            body: JSON.stringify({ rating, text }),
        });
        setReviews(prev => prev.map(r => r.id === reviewId ? updated : r));
        await loadSummaries();
    }, [loadSummaries]);

    const deleteReview = useCallback(async (reviewId: string) => {
        await apiFetch<void>(`/reviews/${reviewId}`, { method: 'DELETE' });
        setReviews(prev => prev.filter(r => r.id !== reviewId));
        await loadSummaries();
    }, [loadSummaries]);

    const getUserReview = useCallback(
        (movieId: number, userId: number) =>
            reviews.find(r => r.movieId === movieId && r.userId === userId),
        [reviews]
    );

    const getSummary = useCallback(
        (movieId: number) => summaries.get(movieId),
        [summaries]
    );

    return (
        <ReviewContext.Provider value={{
            reviews, summaries, loadReviews,
            addReview, updateReview, deleteReview,
            getUserReview, getSummary,
        }}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviews = () => {
    const ctx = useContext(ReviewContext);
    if (!ctx) throw new Error('useReviews must be inside ReviewProvider');
    return ctx;
};