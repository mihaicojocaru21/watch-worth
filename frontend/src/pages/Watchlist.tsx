import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useWatchlist } from '../context/WatchlistContext';
import { useAuth } from '../context/AuthContext';
import { useMovieList } from '../hooks/useMovieList';
import type { Movie } from '../types';

// ── Not-logged-in state ───────────────────────────────────────────────────────
const GuestState = () => (
    <div className="min-h-screen">
        {/* Page header */}
        <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 bg-gray-900">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-72 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative container mx-auto px-4 pt-12 pb-10">
                <div className="flex items-center gap-2.5 mb-3">
                    <div className="h-px w-8 bg-red-500 rounded-full" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Watchlist</span>
                </div>
                <h1 className="text-5xl font-black text-white tracking-tight leading-none">
                    Your personal{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                        cinema list
                    </span>
                </h1>
            </div>
        </div>

        {/* Body */}
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-14 items-center">

                {/* Left — benefits + CTAs */}
                <div>
                    <h2 className="text-2xl font-black text-white mb-2">Sign in to start saving</h2>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                        Create a free account to build your personal watchlist and never lose track of a film you want to see.
                    </p>

                    <div className="space-y-3 mb-10">
                        {[
                            {
                                icon: (
                                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                ),
                                title: 'Save with one tap',
                                desc: 'Hit the heart on any movie card to save it instantly.',
                            },
                            {
                                icon: (
                                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                ),
                                title: 'Never forget a film',
                                desc: 'Your list is always with you — synced to your account.',
                            },
                            {
                                icon: (
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                ),
                                title: 'Browse any genre',
                                desc: 'Build a list as long as you like across all genres.',
                            },
                        ].map(item => (
                            <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/40 border border-gray-700/50">
                                <div className="w-9 h-9 shrink-0 rounded-lg bg-gray-900/60 border border-gray-700 flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-0.5">{item.title}</p>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            to="/login"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
                        >
                            Sign In
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <Link
                            to="/register"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl font-bold transition-all"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>

                {/* Right — ghost preview with lock overlay */}
                <div className="relative hidden md:block select-none" aria-hidden>
                    <div className="grid grid-cols-3 gap-3 blur-[1px] opacity-30">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="aspect-[2/3] rounded-xl bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600/50 flex items-end p-2">
                                <div className="w-full h-2 rounded-full bg-gray-600/60" />
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700 px-8 py-5 text-center shadow-2xl">
                            <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto mb-3">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-white">Sign in to unlock</p>
                            <p className="text-xs text-gray-500 mt-1">Your watchlist awaits</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

// ── Logged-in empty state ─────────────────────────────────────────────────────
const EmptyState = ({ suggestions }: { suggestions: Movie[] }) => (
    <div className="py-4">
        {/* Main message */}
        <div className="flex flex-col items-center text-center py-14 mb-12 rounded-3xl border border-dashed border-gray-700/80 bg-gray-800/20">
            <div className="w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-red-500/15 to-pink-500/10 border border-red-500/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </div>

            <h2 className="text-xl font-black text-white mb-2">Nothing saved yet</h2>
            <p className="text-gray-500 text-sm max-w-xs mb-1.5 leading-relaxed">
                Tap the{' '}
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-bold align-middle">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    ♥
                </span>{' '}
                on any movie to save it here.
            </p>
            <p className="text-gray-600 text-xs mb-8">Your list is private and synced to your account.</p>

            <Link
                to="/movies"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
            >
                Discover Movies
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>

        {/* Top picks to get them started */}
        {suggestions.length > 0 && (
            <div>
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-lg font-black text-white">Start with these</h3>
                        <p className="text-xs text-gray-600 mt-0.5">Top rated films in our collection</p>
                    </div>
                    <Link
                        to="/movies"
                        className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1"
                    >
                        See all
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {suggestions.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        )}
    </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const Watchlist = () => {
    const { user } = useAuth();
    const { watchlist, clearWatchlist } = useWatchlist();
    const { movies, loading: moviesLoading } = useMovieList('rating');

    const watchlistMovies = useMemo(
        () => movies.filter(m => watchlist.includes(m.id)),
        [movies, watchlist]
    );

    const suggestions = useMemo(() => movies.slice(0, 6), [movies]);

    if (!user) return <GuestState />;

    return (
        <div className="container mx-auto px-4 pb-12">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-2">Your list</p>
                    <h1 className="text-4xl font-bold text-white">Watchlist</h1>
                    <p className="text-gray-400 mt-1 text-sm">
                        {moviesLoading
                            ? 'Loading your watchlist…'
                            : watchlistMovies.length === 0
                                ? 'No movies saved yet.'
                                : `${watchlistMovies.length} movie${watchlistMovies.length !== 1 ? 's' : ''} saved`}
                    </p>
                </div>
                {watchlistMovies.length > 0 && (
                    <button
                        onClick={() => { if (window.confirm('Clear your entire watchlist?')) clearWatchlist(); }}
                        className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear all
                    </button>
                )}
            </div>

            {/* Skeleton while movies are loading */}
            {moviesLoading && watchlist.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: Math.min(watchlist.length, 8) }).map((_, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden bg-gray-800/50 border border-gray-700/50 animate-pulse">
                            <div className="aspect-[2/3] bg-gray-700/50" />
                        </div>
                    ))}
                </div>
            )}

            {!moviesLoading && watchlistMovies.length === 0 && (
                <EmptyState suggestions={suggestions} />
            )}

            {!moviesLoading && watchlistMovies.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {watchlistMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
