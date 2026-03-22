import { useState, useEffect } from 'react';

const TMDB_KEY = (import.meta as any).env?.VITE_TMDB_KEY as string | undefined;

export const FALLBACK_POSTER = (title: string) =>
    `https://placehold.co/300x450/1f2937/6b7280?text=${encodeURIComponent(title)}`;

/**
 *
 * @param tmdbId      - TMDB movie ID (0 = skip API call)
 * @param title       - Used for fallback placeholder text
 * @param staticImage - Hardcoded URL used when no API key is available
 */
export function usePoster(tmdbId: number, title: string, staticImage?: string): string {
    const [src, setSrc] = useState<string>(
        staticImage && !staticImage.includes('placehold.co') ? staticImage : ''
    );

    useEffect(() => {
        if (src) return; // already have a real image
        if (!tmdbId) { setSrc(FALLBACK_POSTER(title)); return; }

        if (TMDB_KEY) {
            fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_KEY}`)
                .then(r => r.json())
                .then(d => {
                    if (d.poster_path) {
                        setSrc(`https://image.tmdb.org/t/p/w500${d.poster_path}`);
                    } else {
                        setSrc(staticImage || FALLBACK_POSTER(title));
                    }
                })
                .catch(() => setSrc(staticImage || FALLBACK_POSTER(title)));
        } else {
            setSrc(staticImage || FALLBACK_POSTER(title));
        }
    }, [tmdbId, title, staticImage]);

    return src || FALLBACK_POSTER(title);
}