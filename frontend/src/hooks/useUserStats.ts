import { useMemo } from 'react';
import { MOCK_MOVIES } from '../data/mockData';

interface UserStats {
    watchlistCount: number;
    reviewCount: number;
    avgRatingGiven: number | null;
    favoriteGenre: string | null;
    reviews: {
        movieId: number;
        movieTitle: string;
        genre: string;
        rating: number;
        text: string;
        createdAt: string;
    }[];
}

export function useUserStats(userId: number | undefined, watchlist: number[]): UserStats {
    return useMemo(() => {
        if (!userId) {
            return { watchlistCount: 0, reviewCount: 0, avgRatingGiven: null, favoriteGenre: null, reviews: [] };
        }

        // Scan reviews for all movies from localStorage
        const userReviews: UserStats['reviews'] = [];

        for (const movie of MOCK_MOVIES) {
            try {
                const raw = localStorage.getItem(`watchworth_reviews_${movie.id}`);
                if (!raw) continue;
                const parsed = JSON.parse(raw) as { id: string; userId: number; rating: number; text: string; createdAt: string }[];
                for (const r of parsed) {
                    if (r.userId === userId) {
                        userReviews.push({
                            movieId:    movie.id,
                            movieTitle: movie.title,
                            genre:      movie.genre,
                            rating:     r.rating,
                            text:       r.text,
                            createdAt:  r.createdAt,
                        });
                    }
                }
            } catch {
                // ignore corrupted storage
            }
        }

        // Sort newest first
        userReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Avg rating
        const avgRatingGiven = userReviews.length
            ? Math.round((userReviews.reduce((s, r) => s + r.rating, 0) / userReviews.length) * 10) / 10
            : null;

        // Favorite genre — from watchlist first, fallback to reviewed
        const genreCount: Record<string, number> = {};
        const watchlistMovies = MOCK_MOVIES.filter(m => watchlist.includes(m.id));
        for (const m of watchlistMovies) {
            genreCount[m.genre] = (genreCount[m.genre] ?? 0) + 1;
        }
        if (Object.keys(genreCount).length === 0) {
            for (const r of userReviews) {
                genreCount[r.genre] = (genreCount[r.genre] ?? 0) + 1;
            }
        }
        const favoriteGenre = Object.keys(genreCount).length
            ? Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0][0]
            : null;

        return {
            watchlistCount: watchlist.length,
            reviewCount:    userReviews.length,
            avgRatingGiven,
            favoriteGenre,
            reviews:        userReviews,
        };
    }, [userId, watchlist]);
}