import { useState, useEffect } from 'react';
import { UPCOMING_MOVIES } from '../data/mockUpcoming';
import type { UpcomingMovie } from '../types';

// ---------------------------------------------------------------------------
// Poster fetcher — uses VITE_TMDB_KEY from .env.local if available
// Add this line to your .env.local:   VITE_TMDB_KEY=your_key_from_themoviedb.org
// Get a free key at: https://www.themoviedb.org/settings/api
// ---------------------------------------------------------------------------
const TMDB_KEY = (import.meta as any).env?.VITE_TMDB_KEY as string | undefined;

const FALLBACK = (title: string) =>
    `https://placehold.co/300x450/0f172a/4b5563?text=${encodeURIComponent(title)}`;

function usePoster(tmdbId: number, fallbackTitle: string, staticImage: string) {
    const [src, setSrc] = useState(staticImage && !staticImage.includes('placehold.co') ? staticImage : '');

    useEffect(() => {
        if (src) return; // already have a real image
        if (!tmdbId) { setSrc(FALLBACK(fallbackTitle)); return; }

        if (TMDB_KEY) {
            fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_KEY}`)
                .then(r => r.json())
                .then(d => {
                    if (d.poster_path) {
                        setSrc(`https://image.tmdb.org/t/p/w500${d.poster_path}`);
                    } else {
                        setSrc(FALLBACK(fallbackTitle));
                    }
                })
                .catch(() => setSrc(FALLBACK(fallbackTitle)));
        } else {
            // No API key — try a direct TMDB image path guess, fallback to placeholder
            setSrc(FALLBACK(fallbackTitle));
        }
    }, [tmdbId]);

    return src || FALLBACK(fallbackTitle);
}

// ---------------------------------------------------------------------------

const YEARS = [2026, 2027, 2028];

const STATUS_STYLES: Record<UpcomingMovie['status'], string> = {
    'Coming Soon':     'bg-green-500/15 text-green-400 border-green-500/25',
    'Post-Production': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
    'In Production':   'bg-blue-500/15 text-blue-400 border-blue-500/25',
};

const STATUS_DOT: Record<UpcomingMovie['status'], string> = {
    'Coming Soon':     'bg-green-400',
    'Post-Production': 'bg-yellow-400',
    'In Production':   'bg-blue-400',
};

const UpcomingCard = ({ movie }: { movie: UpcomingMovie }) => {
    const posterSrc = usePoster(movie.tmdbId, movie.title, movie.image);
    const [imgError, setImgError] = useState(false);

    const finalSrc = imgError ? FALLBACK(movie.title) : posterSrc;

    return (
        <div className="group relative flex flex-col sm:flex-row gap-5 rounded-2xl border border-gray-700/60 bg-gray-800/40 p-5 hover:border-gray-600/80 hover:bg-gray-800/60 transition-all duration-300">

            {/* Poster */}
            <div className="shrink-0 w-full sm:w-28 aspect-[2/3] sm:aspect-auto sm:h-40 rounded-xl overflow-hidden border border-white/5 shadow-lg shadow-black/30 bg-gray-900">
                {finalSrc ? (
                    <img
                        src={finalSrc}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-gray-700 border-t-gray-500 rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wider ${STATUS_STYLES[movie.status]}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[movie.status]}`} />
                            {movie.status}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-gray-900/60 border border-gray-700 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                            {movie.genre}
                        </span>
                        <span className="ml-auto text-xs font-bold text-gray-500 shrink-0">{movie.releaseDate}</span>
                    </div>

                    <h3 className="text-lg font-black text-white leading-tight mb-1 truncate">{movie.title}</h3>

                    <p className="text-xs text-gray-500 mb-2.5">
                        <span className="text-gray-600">Dir. </span>
                        <span className="text-gray-400 font-medium">{movie.director}</span>
                    </p>

                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{movie.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {movie.cast.slice(0, 4).map(actor => (
                        <span key={actor} className="px-2.5 py-1 rounded-lg bg-gray-900/50 border border-gray-700/60 text-[11px] text-gray-400 font-medium">
                            {actor}
                        </span>
                    ))}
                    {movie.cast.length > 4 && (
                        <span className="px-2.5 py-1 rounded-lg bg-gray-900/50 border border-gray-700/60 text-[11px] text-gray-500">
                            +{movie.cast.length - 4} more
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function Upcoming() {
    const [activeYear, setActiveYear] = useState<number | 'all'>('all');

    const filtered = activeYear === 'all'
        ? UPCOMING_MOVIES
        : UPCOMING_MOVIES.filter(m => m.year === activeYear);

    const countByYear = (y: number) => UPCOMING_MOVIES.filter(m => m.year === y).length;

    return (
        <div className="min-h-screen">

            {/* ── Header ── */}
            <div className="relative overflow-hidden border-b border-gray-800">
                <div className="absolute -top-20 left-0 w-96 h-72 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-72 h-64 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

                <div className="relative container mx-auto px-4 pt-12 pb-10">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="h-px w-8 bg-indigo-500 rounded-full" />
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">On the horizon</span>
                            </div>
                            <h1 className="text-5xl font-black text-white tracking-tight leading-none mb-3">
                                Coming{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                    Soon
                                </span>
                            </h1>
                            <p className="text-gray-500 text-sm max-w-md">
                                Confirmed releases and highly anticipated films for 2026–2028. Dates subject to change.
                            </p>
                        </div>

                        {!TMDB_KEY && (
                            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-yellow-500/8 border border-yellow-500/20 max-w-sm">
                                <svg className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div>
                                    <p className="text-xs font-bold text-yellow-400 mb-0.5">Posters need a TMDB key</p>
                                    <p className="text-[11px] text-gray-500">Add <code className="text-yellow-400/80">VITE_TMDB_KEY=your_key</code> to <code className="text-yellow-400/80">.env.local</code>. Free at <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noreferrer" className="underline text-indigo-400 hover:text-indigo-300">themoviedb.org</a></p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            {YEARS.map(y => (
                                <div key={y} className="text-center px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700/60">
                                    <p className="text-xl font-black text-white">{countByYear(y)}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mt-0.5">{y}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">

                {/* ── Year filter ── */}
                <div className="flex items-center gap-2 py-6 flex-wrap">
                    {(['all', ...YEARS] as const).map(y => (
                        <button
                            key={y}
                            onClick={() => setActiveYear(y)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                                activeYear === y
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                                    : 'bg-gray-800/70 border-gray-700/80 text-gray-400 hover:text-white hover:border-gray-600'
                            }`}
                        >
                            {y === 'all' ? 'All Years' : y}
                            {y !== 'all' && (
                                <span className={`ml-2 text-xs font-black ${activeYear === y ? 'text-indigo-200' : 'text-gray-600'}`}>
                                    {countByYear(y)}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* ── Grouped by year ── */}
                {YEARS.filter(y => activeYear === 'all' || activeYear === y).map(year => {
                    const films = filtered.filter(m => m.year === year);
                    if (!films.length) return null;
                    return (
                        <div key={year} className="mb-12">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                    {year}
                                </span>
                                <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/30 via-gray-700 to-transparent" />
                                <span className="text-xs text-gray-600 font-semibold uppercase tracking-widest">{films.length} film{films.length !== 1 ? 's' : ''}</span>
                            </div>

                            <div className="space-y-4">
                                {films.map(movie => (
                                    <UpcomingCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* Legend */}
                <div className="mt-8 pt-8 border-t border-gray-800 flex flex-wrap items-center gap-5">
                    <span className="text-xs text-gray-600 uppercase tracking-widest font-semibold">Status</span>
                    {(Object.entries(STATUS_STYLES) as [UpcomingMovie['status'], string][]).map(([status, cls]) => (
                        <span key={status} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wider ${cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
                            {status}
                        </span>
                    ))}
                    <span className="text-xs text-gray-700 ml-auto">Release dates sourced from Rotten Tomatoes & IMDB, subject to change.</span>
                </div>
            </div>
        </div>
    );
}