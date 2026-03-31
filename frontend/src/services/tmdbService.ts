import { apiFetch } from './api';

interface ImportResult {
    imported: number;
    skipped:  number;
    total:    number;
}

export const tmdbService = {
    import: (pages: number, category: string): Promise<ImportResult> =>
        apiFetch(`/tmdb/import?pages=${pages}&category=${category}`, { method: 'POST' }),
};