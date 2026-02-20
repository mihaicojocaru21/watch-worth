import type { Movie } from '../types';
import { MOCK_MOVIES } from '../data/mockData';

let movies = [...MOCK_MOVIES];
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const movieService = {
    getAll: async (search?: string, sortBy?: string) => {
        await delay(300);
        let filtered = [...movies];

        if (search) {
            filtered = filtered.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
        }

        if (sortBy === 'year') {
            filtered.sort((a, b) => b.year - a.year);
        }

        return filtered;
    },

    delete: async (id: number) => {
        await delay(300);
        movies = movies.filter(m => m.id !== id);
    },

    create: async (data: Omit<Movie, 'id'>) => {
        await delay(300);
        const newMovie = { ...data, id: Date.now() } as Movie;
        movies.unshift(newMovie);
        return newMovie;
    },

    update: async (id: number, data: Partial<Movie>) => {
        await delay(300);
        const index = movies.findIndex(m => m.id === id);
        if (index === -1) return null;
        movies[index] = { ...movies[index], ...data };
        return movies[index];
    },

    getBrokenData: async () => {
        await new Promise(res => setTimeout(res, 500));
        throw new Error("500 Internal Server Error");
    }
};