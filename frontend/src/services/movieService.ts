import type { Movie } from '../types';
import { MOCK_MOVIES } from '../data/mockData';

let movies = [...MOCK_MOVIES];
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const movieService = {
    getAll: async (search?: string, sortBy?: string): Promise<Movie[]> => {
        await delay(300);
        let filtered = [...movies];

        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(m => m.title.toLowerCase().includes(q));
        }

        if (sortBy === 'year') {
            filtered.sort((a, b) => b.year - a.year);
        } else if (sortBy === 'genre') {
            filtered.sort((a, b) => a.genre.localeCompare(b.genre));
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        return filtered;
    },

    getById: async (id: number): Promise<Movie | null> => {
        await delay(200);
        return movies.find(m => m.id === id) ?? null;
    },

    delete: async (id: number): Promise<void> => {
        await delay(300);
        movies = movies.filter(m => m.id !== id);
    },

    create: async (data: Omit<Movie, 'id'>): Promise<Movie> => {
        await delay(300);
        const newMovie: Movie = { ...data, id: Date.now() };
        movies.unshift(newMovie);
        return newMovie;
    },

    update: async (id: number, data: Partial<Movie>): Promise<Movie | null> => {
        await delay(300);
        const index = movies.findIndex(m => m.id === id);
        if (index === -1) return null;
        movies[index] = { ...movies[index], ...data };
        return movies[index];
    },
};