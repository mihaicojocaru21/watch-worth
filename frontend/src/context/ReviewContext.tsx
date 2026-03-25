import { createContext, useContext, useState, useCallback } from 'react';
import type { Review } from '../types';
import { apiFetch } from '../services/api';

interface ReviewContextValue {
    reviews: Review[];
    loadReviews: (movieId: number) => void;
    addReview: (movieId: number, rating: number, text: string) => Promise<void>;
    updateReview: (reviewId: string, rating: number, text: string) => Promise<void>;
    deleteReview: (reviewId: string) => Promise<void>;
    getUserReview: (movieId: number, userId: number) => Review | undefined;
}

const ReviewContext = createContext<ReviewContextValue | null>(null);

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [reviews, setReviews] = useState<Review[]>([]);

    const loadReviews = useCallback((movieId: number) => {
        apiFetch<Review[]>(`/movies/${movieId}/reviews`)
            .then(data => setReviews(data))
            .catch(() => setReviews([]));
    }, []);

    const addReview = useCallback(async (movieId: number, rating: number, text: string) => {
        const newReview = await apiFetch<Review>(`/movies/${movieId}/reviews`, {
            method: 'POST',
            body: JSON.stringify({ rating, text }),
        });
        setReviews(prev => [newReview, ...prev]);
    }, []);

    const updateReview = useCallback(async (reviewId: string, rating: number, text: string) => {
        const updated = await apiFetch<Review>(`/reviews/${reviewId}`, {
            method: 'PUT',
            body: JSON.stringify({ rating, text }),
        });
        setReviews(prev => prev.map(r => r.id === reviewId ? updated : r));
    }, []);

    const deleteReview = useCallback(async (reviewId: string) => {
        await apiFetch<void>(`/reviews/${reviewId}`, { method: 'DELETE' });
        setReviews(prev => prev.filter(r => r.id !== reviewId));
    }, []);

    const getUserReview = useCallback(
        (movieId: number, userId: number) =>
            reviews.find(r => r.movieId === movieId && r.userId === userId),
        [reviews]
    );

    return (
        <ReviewContext.Provider value={{
            reviews, loadReviews, addReview, updateReview, deleteReview, getUserReview,
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