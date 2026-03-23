import { useState, useEffect } from 'react';

const TMDB_KEY = (import.meta as any).env?.VITE_TMDB_KEY as string | undefined;

export const FALLBACK_POSTER = (title: string) =>
    `https://placehold.co/300x450/1f2937/6b7280?text=${encodeURIComponent(title)}`;

/**
 * Returnează URL-ul posterului pentru un film.
 * - Dacă VITE_TMDB_KEY e setat → fetch din TMDB API
 * - Altfel → folosește staticImage dacă există, sau placeholder
 *
 * Re-fetch-uiește automat dacă tmdbId se schimbă (ex. navigare între filme).
 */
export function usePoster(tmdbId: number, title: string, staticImage?: string): string {
    const getInitial = () =>
        staticImage && !staticImage.includes('placehold.co') && !TMDB_KEY
            ? staticImage
            : '';

    const [src, setSrc] = useState<string>(getInitial);

    useEffect(() => {
        // Resetăm src când tmdbId se schimbă — permite re-fetch la navigare
        setSrc(getInitial());

        if (!tmdbId) {
            setSrc(staticImage || FALLBACK_POSTER(title));
            return;
        }

        if (TMDB_KEY) {
            let cancelled = false;
            fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_KEY}`)
                .then(r => r.json())
                .then(d => {
                    if (cancelled) return;
                    setSrc(
                        d.poster_path
                            ? `https://image.tmdb.org/t/p/w500${d.poster_path}`
                            : staticImage || FALLBACK_POSTER(title)
                    );
                })
                .catch(() => {
                    if (!cancelled) setSrc(staticImage || FALLBACK_POSTER(title));
                });
            return () => { cancelled = true; };
        } else {
            setSrc(staticImage || FALLBACK_POSTER(title));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tmdbId]);

    return src || FALLBACK_POSTER(title);
}