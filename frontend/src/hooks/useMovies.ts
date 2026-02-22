import { useCallback, useEffect, useState } from 'react';
import type { Movie } from '../types';
import { movieService } from '../services/movieService';

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const loadMovies = useCallback(async () => {
        try {
            const data = await movieService.getAll();
            setMovies(data);
        } catch (error) {
            console.error('Failed to load movies');
        }
    }, []);

    useEffect(() => {
        loadMovies();
    }, [loadMovies]);

    const addMovie = async (data: Omit<Movie, 'id'>) => {
        await movieService.create(data);
        await loadMovies();
    };

    const updateMovie = async (id: number, data: Partial<Movie>) => {
        await movieService.update(id, data);
        await loadMovies();
    };

    const deleteMovie = async (id: number) => {
        await movieService.delete(id);
        await loadMovies();
    };

    return { movies, addMovie, updateMovie, deleteMovie };
};