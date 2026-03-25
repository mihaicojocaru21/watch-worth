// frontend/src/hooks/useUserStats.ts
import { useMemo }       from 'react';
import { MOCK_MOVIES }   from '../data/mockData';
import type { Review }   from '../types';

interface UserStats {
    watchlistCount:  number;
    reviewCount:     number;
    avgRatingGiven:  number | null;
    favoriteGenre:   string | null;
    reviews: {
        movieId:    number;
        movieTitle: string;
        genre:      string;
        rating:     number;
        text:       string;
        createdAt:  string;
    }[];
}

export function useUserStats(
    userId:   number | undefined,
    watchlist: number[],
    allReviews: Review[]
): UserStats {
    return useMemo(() => {
        if (!userId) {
            return {
                watchlistCount: 0,
                reviewCount:    0,
                avgRatingGiven: null,
                favoriteGenre:  null,
                reviews:        [],
            };
        }

        const userReviews = allReviews
            .filter(r => r.userId === userId)
            .map(r => {
                const movie = MOCK_MOVIES.find(m => m.id === r.movieId);
                return {
                    movieId:    r.movieId,
                    movieTitle: movie?.title ?? 'Unknown',
                    genre:      movie?.genre ?? '',
                    rating:     r.rating,
                    text:       r.text,
                    createdAt:  r.createdAt,
                };
            })
            .sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

        const avgRatingGiven = userReviews.length
            ? Math.round(
            (userReviews.reduce((s, r) => s + r.rating, 0) / userReviews.length) * 10
        ) / 10
            : null;

        const genreCount: Record<string, number> = {};
        MOCK_MOVIES
            .filter(m => watchlist.includes(m.id))
            .forEach(m => { genreCount[m.genre] = (genreCount[m.genre] ?? 0) + 1; });

        if (Object.keys(genreCount).length === 0) {
            userReviews.forEach(r => {
                genreCount[r.genre] = (genreCount[r.genre] ?? 0) + 1;
            });
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
    }, [userId, watchlist, allReviews]);
}