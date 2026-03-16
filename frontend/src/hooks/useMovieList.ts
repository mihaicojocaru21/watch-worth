import { useCallback, useEffect, useState } from 'react';
import type { Movie } from '../types';
import { movieService } from '../services/movieService';

type SortOption = 'year' | 'genre' | 'rating';

export const useMovieList = (initialSort: SortOption = 'rating') => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | 'internal'>(null);

    const loadMovies = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await movieService.getAll(undefined, initialSort);
            setMovies(data);
        } catch {
            setError('internal');
        } finally {
            setLoading(false);
        }
    }, [initialSort]);

    useEffect(() => {
        loadMovies();
    }, [loadMovies]);

    return {
        movies,
        loading,
        error,
        refresh: loadMovies,
    };
};