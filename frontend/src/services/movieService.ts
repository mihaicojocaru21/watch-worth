import type { Movie } from '../types';
import { MOCK_MOVIES } from '../data/mockData';

const STORAGE_KEY = 'watchworth_movies';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/* ── Helpers localStorage ── */
const loadMovies = (): Movie[] => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved) as Movie[];
    } catch {
        // corupt — ignoră și reinițializează
    }
    // Prima rulare: seeduim cu datele mock și salvăm
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_MOVIES));
    return [...MOCK_MOVIES];
};

const saveMovies = (movies: Movie[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
};

export const movieService = {
    getAll: async (search?: string, sortBy?: string): Promise<Movie[]> => {
        await delay(300);
        let filtered = loadMovies();

        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(m => m.title.toLowerCase().includes(q));
        }

        if (sortBy === 'year')   filtered.sort((a, b) => b.year - a.year);
        else if (sortBy === 'genre')  filtered.sort((a, b) => a.genre.localeCompare(b.genre));
        else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

        return filtered;
    },

    getById: async (id: number): Promise<Movie | null> => {
        await delay(200);
        return loadMovies().find(m => m.id === id) ?? null;
    },

    create: async (data: Omit<Movie, 'id'>): Promise<Movie> => {
        await delay(300);
        const movies = loadMovies();
        const newMovie: Movie = { ...data, id: Date.now() };
        movies.unshift(newMovie);
        saveMovies(movies);
        return newMovie;
    },

    update: async (id: number, data: Partial<Movie>): Promise<Movie | null> => {
        await delay(300);
        const movies = loadMovies();
        const index = movies.findIndex(m => m.id === id);
        if (index === -1) return null;
        movies[index] = { ...movies[index], ...data };
        saveMovies(movies);
        return movies[index];
    },

    delete: async (id: number): Promise<void> => {
        await delay(300);
        saveMovies(loadMovies().filter(m => m.id !== id));
    },
    
    reset: () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_MOVIES));
    },
};