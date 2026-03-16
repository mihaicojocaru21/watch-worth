import { useCallback, useEffect, useState } from 'react';
import type { Movie } from '../types';
import { movieService } from '../services/movieService';

type SortOption = 'year' | 'genre' | 'rating';

export const useMovieList = (initialSearch = '', initialSort: SortOption = 'year') => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [search, setSearch] = useState(initialSearch);
    const [sortBy, setSortBy] = useState<SortOption>(initialSort);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | 'internal'>(null);

    const loadMovies = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await movieService.getAll(search, sortBy);
            setMovies(data);
        } catch {
            setError('internal');
        } finally {
            setLoading(false);
        }
    }, [search, sortBy]);

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
    };
};