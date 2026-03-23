// frontend/src/context/ReviewContext.tsx

import { createContext, useContext, useState, useCallback } from 'react';
import type { Review } from '../types';
import { apiFetch } from '../services/api';

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

    const loadReviews = useCallback((movieId: number) => {
        apiFetch<Review[]>(`/movies/${movieId}/reviews`)
            .then(data => setReviews(data))
            .catch(() => setReviews([]));
    }, []);

    const addReview = useCallback(async (
        movieId: number,
        _userId: number,    // ignorat — backend îl extrage din JWT
        _username: string,  // ignorat — backend îl extrage din JWT
        rating: number,
        text: string
    ) => {
        try {
            const newReview = await apiFetch<Review>(`/movies/${movieId}/reviews`, {
                method: 'POST',
                body: JSON.stringify({ rating, text }),
            });
            setReviews(prev => [newReview, ...prev]);
        } catch (err) {
            throw err; // re-throw ca MovieDetail să poată afișa eroarea
        }
    }, []);

    const updateReview = useCallback(async (
        reviewId: string,
        movieId: number,
        rating: number,
        text: string
    ) => {
        try {
            const updated = await apiFetch<Review>(`/reviews/${reviewId}`, {
                method: 'PUT',
                body: JSON.stringify({ rating, text }),
            });
            setReviews(prev => prev.map(r => r.id === reviewId ? updated : r));
        } catch (err) {
            throw err;
        }
    }, []);

    const deleteReview = useCallback(async (reviewId: string, _movieId: number) => {
        try {
            await apiFetch<void>(`/reviews/${reviewId}`, { method: 'DELETE' });
            setReviews(prev => prev.filter(r => r.id !== reviewId));
        } catch (err) {
            throw err;
        }
    }, []);

    const getUserReview = useCallback(
        (movieId: number, userId: number) =>
            reviews.find(r => r.movieId === movieId && r.userId === userId),
        [reviews]
    );

    return (
        <ReviewContext.Provider value={{
            reviews,
            loadReviews,
            addReview,
            updateReview,
            deleteReview,
            getUserReview,
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