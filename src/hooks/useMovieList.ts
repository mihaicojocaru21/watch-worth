import { useCallback, useEffect, useState } from 'react';
import type { Movie } from '../types';
import { movieService } from '../services/movieService';

type SortOption = '' | 'year';

export const useMovieList = (initialSearch = '', initialSort: SortOption = '') => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [search, setSearch] = useState(initialSearch);
    const [sortBy, setSortBy] = useState<SortOption>(initialSort);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | 'internal'>(null);

    const loadMovies = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await movieService.getAll(search, sortBy || undefined);
            setMovies(data);
        } catch {
            setError('internal');
        } finally {
            setLoading(false);
        }
    }, [search, sortBy]);

    const simulateError = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            await movieService.getBrokenData();
        } catch {
            setError('internal');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMovies();
    }, [loadMovies]);

    return {
        movies,
        search,
        sortBy,
        loading,
        error,
        setSearch,
        setSortBy,
        refresh: loadMovies,
        simulateError,
    };
};