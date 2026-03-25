import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieList } from '../hooks/useMovieList';

// ── One visual identity per genre ──────────────────────────────────────────
const GENRE_META: Record<string, { color: string; border: string; glow: string; icon: React.ReactNode }> = {
    Drama: {
        color: 'from-blue-500/20 to-transparent',
        border: 'border-blue-500/30 hover:border-blue-400/60',
        glow:   'bg-blue-500/10',
        icon: <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/></svg>,
    },
    Crime: {
        color: 'from-red-500/20 to-transparent',
        border: 'border-red-500/30 hover:border-red-400/60',
        glow:   'bg-red-500/10',
        icon: <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>,
    },
    Action: {
        color: 'from-orange-500/20 to-transparent',
        border: 'border-orange-500/30 hover:border-orange-400/60',
        glow:   'bg-orange-500/10',
        icon: <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
    },
    'Sci-Fi': {
        color: 'from-cyan-500/20 to-transparent',
        border: 'border-cyan-500/30 hover:border-cyan-400/60',
        glow:   'bg-cyan-500/10',
        icon: <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>,
    },
    Thriller: {
        color: 'from-yellow-500/20 to-transparent',
        border: 'border-yellow-500/30 hover:border-yellow-400/60',
        glow:   'bg-yellow-500/10',
        icon: <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    },
    Fantasy: {
        color: 'from-purple-500/20 to-transparent',
        border: 'border-purple-500/30 hover:border-purple-400/60',
        glow:   'bg-purple-500/10',
        icon: <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>,
    },
    Horror: {
        color: 'from-rose-500/20 to-transparent',
        border: 'border-rose-500/30 hover:border-rose-400/60',
        glow:   'bg-rose-500/10',
        icon: <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>,
    },
    Animation: {
        color: 'from-pink-500/20 to-transparent',
        border: 'border-pink-500/30 hover:border-pink-400/60',
        glow:   'bg-pink-500/10',
        icon: <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm5.25 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z"/></svg>,
    },
    War: {
        color: 'from-stone-500/20 to-transparent',
        border: 'border-stone-500/30 hover:border-stone-400/60',
        glow:   'bg-stone-500/10',
        icon: <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"/></svg>,
    },
    Mystery: {
        color: 'from-indigo-500/20 to-transparent',
        border: 'border-indigo-500/30 hover:border-indigo-400/60',
        glow:   'bg-indigo-500/10',
        icon: <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>,
    },
    History: {
        color: 'from-amber-500/20 to-transparent',
        border: 'border-amber-500/30 hover:border-amber-400/60',
        glow:   'bg-amber-500/10',
        icon: <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>,
    },
    Romance: {
        color: 'from-fuchsia-500/20 to-transparent',
        border: 'border-fuchsia-500/30 hover:border-fuchsia-400/60',
        glow:   'bg-fuchsia-500/10',
        icon: <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>,
    },
    Western: {
        color: 'from-lime-500/20 to-transparent',
        border: 'border-lime-500/30 hover:border-lime-400/60',
        glow:   'bg-lime-500/10',
        icon: <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.185L6 21l4.333-2.143C11.074 19.04 12 19.04 12 19.04s.926 0 1.667-.183L18 21l-.889-4.7C19.478 14.935 21 12.672 21 10.115 21 6.185 16.97 3 12 3z"/></svg>,
    },
    Comedy: {
        color: 'from-teal-500/20 to-transparent',
        border: 'border-teal-500/30 hover:border-teal-400/60',
        glow:   'bg-teal-500/10',
        icon: <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm5.25 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z"/></svg>,
    },
    Biography: {
        color: 'from-sky-500/20 to-transparent',
        border: 'border-sky-500/30 hover:border-sky-400/60',
        glow:   'bg-sky-500/10',
        icon: <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>,
    },
};

const DEFAULT_META: { color: string; border: string; glow: string; icon: React.ReactNode } = {
    color: 'from-gray-500/20 to-transparent',
    border: 'border-gray-500/30 hover:border-gray-400/60',
    glow:   'bg-gray-500/10',
    icon: <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-9.375c0-.621.504-1.125 1.125-1.125H6m0 0h12m0 0h1.125c.621 0 1.125.504 1.125 1.125v9.375m-18 0v-9.375m0 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v3.75m-18 0h18"/></svg>,
};

const Genres = () => {
    const navigate = useNavigate();
    const { movies, loading } = useMovieList('rating');

    const genreStats = useMemo(() => {
        if (!movies.length) return [];

        const map: Record<string, { count: number; topRated: string; topRating: number; avgRating: number }> = {};

        for (const m of movies) {
            if (!map[m.genre]) {
                map[m.genre] = { count: 0, topRated: m.title, topRating: m.rating, avgRating: 0 };
            }
            map[m.genre].count++;
            map[m.genre].avgRating += m.rating;
            if (m.rating > map[m.genre].topRating) {
                map[m.genre].topRated  = m.title;
                map[m.genre].topRating = m.rating;
            }
        }

        return Object.entries(map)
            .map(([genre, s]) => ({
                genre,
                count:     s.count,
                topRated:  s.topRated,
                avgRating: +(s.avgRating / s.count).toFixed(1),
            }))
            .sort((a, b) => b.count - a.count);
    }, [movies]);

    return (
        <div className="min-h-screen">

            {/* ── Header ── */}
            <div className="relative overflow-hidden border-b border-gray-800">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-64 bg-blue-600/6 rounded-full blur-3xl pointer-events-none" />

                <div className="relative container mx-auto px-4 pt-12 pb-10">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="h-px w-8 bg-purple-500 rounded-full" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">Browse</span>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tight leading-none mb-3">
                        All{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            Genres
                        </span>
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {loading
                            ? 'Loading genres…'
                            : `${genreStats.length} genres across ${movies.length} films`}
                    </p>
                </div>
            </div>

            {/* ── Grid ── */}
            <div className="container mx-auto px-4 py-10 pb-16">

                {/* Loading skeletons */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="h-44 rounded-2xl bg-gray-800/50 animate-pulse border border-gray-700/50" />
                        ))}
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {genreStats.map(({ genre, count, topRated, avgRating }) => {
                            const meta = GENRE_META[genre] ?? DEFAULT_META;
                            return (
                                <button
                                    key={genre}
                                    onClick={() => navigate(`/movies?genre=${encodeURIComponent(genre)}`)}
                                    className={`group relative overflow-hidden rounded-2xl border bg-gray-800/40 hover:bg-gray-800/70 p-6 text-left transition-all duration-300 ${meta.border}`}
                                >
                                    {/* Gradient glow top-left */}
                                    <div className={`absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl -translate-x-10 -translate-y-10 opacity-60 group-hover:opacity-100 transition-opacity ${meta.glow}`} />

                                    <div className="relative flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            {/* Icon + title */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${meta.glow} border border-white/5`}>
                                                    {meta.icon}
                                                </div>
                                                <h2 className="text-lg font-black text-white">{genre}</h2>
                                            </div>

                                            {/* Top rated */}
                                            <p className="text-xs text-gray-600 mb-0.5 uppercase tracking-wider">Top rated</p>
                                            <p className="text-sm text-gray-400 font-medium truncate mb-4">{topRated}</p>

                                            {/* Stats row */}
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <p className="text-xl font-black text-white leading-none">{count}</p>
                                                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-0.5">films</p>
                                                </div>
                                                <div className="w-px h-8 bg-gray-700" />
                                                <div>
                                                    <p className="text-xl font-black text-white leading-none">★ {avgRating}</p>
                                                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-0.5">avg rating</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <svg className="w-4 h-4 text-gray-700 group-hover:text-white mt-1 shrink-0 translate-x-0 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>

                                    {/* Bottom sweep */}
                                    <div className={`absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${meta.color}`} />
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Genres;