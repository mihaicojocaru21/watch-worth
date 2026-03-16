import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Review } from '../types';
import { MOCK_REVIEWS } from '../data/mockReviews';

const STORAGE_KEY   = (movieId: number) => `watchworth_reviews_${movieId}`;
const SEEDED_KEY    = 'watchworth_reviews_seeded';

const load = (movieId: number): Review[] => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY(movieId)) ?? '[]');
    } catch {
        return [];
    }
};

const save = (movieId: number, reviews: Review[]) => {
    localStorage.setItem(STORAGE_KEY(movieId), JSON.stringify(reviews));
};

/* ── Context shape ── */
interface ReviewContextValue {
    reviews: Review[];
    loadReviews: (movieId: number) => void;
    addReview: (movieId: number, userId: number, username: string, rating: number, text: string) => void;
    updateReview: (reviewId: string, movieId: number, rating: number, text: string) => void;
    deleteReview: (reviewId: string, movieId: number) => void;
    getUserReview: (movieId: number, userId: number) => Review | undefined;
}

const ReviewContext = createContext<ReviewContextValue | null>(null);

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [reviews, setReviews] = useState<Review[]>([]);

    // Seed mock reviews once on first ever load
    useEffect(() => {
        if (localStorage.getItem(SEEDED_KEY)) return;
        // Group by movieId and write each bucket
        const byMovie: Record<number, Review[]> = {};
        for (const r of MOCK_REVIEWS) {
            if (!byMovie[r.movieId]) byMovie[r.movieId] = [];
            byMovie[r.movieId].push(r);
        }
        for (const [movieId, movieReviews] of Object.entries(byMovie)) {
            const existing = load(Number(movieId));
            // Only seed if no real reviews exist yet
            if (existing.length === 0) {
                localStorage.setItem(STORAGE_KEY(Number(movieId)), JSON.stringify(movieReviews));
            }
        }
        localStorage.setItem(SEEDED_KEY, '1');
    }, []);

    const loadReviews = useCallback((movieId: number) => {
        setReviews(load(movieId));
    }, []);

    const addReview = useCallback((movieId: number, userId: number, username: string, rating: number, text: string) => {
        const review: Review = {
            id: `${userId}-${movieId}-${Date.now()}`,
            movieId,
            userId,
            username,
            rating,
            text,
            createdAt: new Date().toISOString(),
        };
        const updated = [review, ...load(movieId)];
        save(movieId, updated);
        setReviews(updated);
    }, []);

    const updateReview = useCallback((reviewId: string, movieId: number, rating: number, text: string) => {
        const updated = load(movieId).map(r =>
            r.id === reviewId ? { ...r, rating, text, createdAt: new Date().toISOString() } : r
        );
        save(movieId, updated);
        setReviews(updated);
    }, []);

    const deleteReview = useCallback((reviewId: string, movieId: number) => {
        const updated = load(movieId).filter(r => r.id !== reviewId);
        save(movieId, updated);
        setReviews(updated);
    }, []);

    const getUserReview = useCallback((movieId: number, userId: number) => {
        return reviews.find(r => r.movieId === movieId && r.userId === userId);
    }, [reviews]);

    return (
        <ReviewContext.Provider value={{ reviews, loadReviews, addReview, updateReview, deleteReview, getUserReview }}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviews = () => {
    const ctx = useContext(ReviewContext);
    if (!ctx) throw new Error('useReviews must be inside ReviewProvider');
    return ctx;
};