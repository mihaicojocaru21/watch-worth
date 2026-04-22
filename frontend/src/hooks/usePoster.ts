import { useState, useEffect } from 'react';

const TMDB_KEY = (import.meta as any).env?.VITE_TMDB_KEY as string | undefined;

export const FALLBACK_POSTER = (title: string) =>
    `https://placehold.co/300x450/1f2937/6b7280?text=${encodeURIComponent(title)}`;

// Module-level cache — survives re-renders and page navigations within the session
const posterCache = new Map<number, string>();

export function usePoster(tmdbId: number, title: string, staticImage?: string): string {
    const getInitial = (): string => {
        if (tmdbId && posterCache.has(tmdbId)) return posterCache.get(tmdbId)!;
        if (staticImage && !staticImage.includes('placehold.co') && !TMDB_KEY) return staticImage;
        return '';
    };

    const [src, setSrc] = useState<string>(getInitial);

    useEffect(() => {
        // Already cached — nothing to do
        if (tmdbId && posterCache.has(tmdbId)) {
            setSrc(posterCache.get(tmdbId)!);
            return;
        }

        setSrc(getInitial());

        if (!tmdbId) {
            const url = staticImage || FALLBACK_POSTER(title);
            setSrc(url);
            return;
        }

        if (TMDB_KEY) {
            let cancelled = false;
            fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_KEY}`)
                .then(r => r.json())
                .then(d => {
                    if (cancelled) return;
                    const url = d.poster_path
                        ? `https://image.tmdb.org/t/p/w342${d.poster_path}`
                        : staticImage || FALLBACK_POSTER(title);
                    posterCache.set(tmdbId, url);
                    setSrc(url);
                })
                .catch(() => {
                    if (!cancelled) setSrc(staticImage || FALLBACK_POSTER(title));
                });
            return () => { cancelled = true; };
        } else {
            const url = staticImage || FALLBACK_POSTER(title);
            if (tmdbId) posterCache.set(tmdbId, url);
            setSrc(url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tmdbId]);

    return src || FALLBACK_POSTER(title);
}
