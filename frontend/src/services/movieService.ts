// frontend/src/services/movieService.ts

import type { Movie } from '../types';
import { apiFetch } from './api';

export const movieService = {
    getAll: async (search?: string, sortBy?: string): Promise<Movie[]> => {
        const params = new URLSearchParams();
        if (search)  params.set('search', search);
        if (sortBy)  params.set('sort', sortBy);

        const query = params.toString() ? `?${params.toString()}` : '';
        return apiFetch<Movie[]>(`/movies${query}`);
    },

    getById: async (id: number): Promise<Movie | null> => {
        try {
            return await apiFetch<Movie>(`/movies/${id}`);
        } catch {
            return null;
        }
    },

    create: async (data: Omit<Movie, 'id'>): Promise<Movie> => {
        return apiFetch<Movie>('/movies', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    update: async (id: number, data: Partial<Movie>): Promise<Movie | null> => {
        try {
            return await apiFetch<Movie>(`/movies/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
        } catch {
            return null;
        }
    },

    delete: async (id: number): Promise<void> => {
        await apiFetch<void>(`/movies/${id}`, { method: 'DELETE' });
    },
};