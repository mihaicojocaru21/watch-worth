// frontend/src/pages/Watchlist.tsx
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useWatchlist } from '../context/WatchlistContext';
import { useAuth } from '../context/AuthContext';
import { useMovieList } from '../hooks/useMovieList';

const Watchlist = () => {
    const { user } = useAuth();
    const { watchlist, clearWatchlist } = useWatchlist();
    const { movies, loading: moviesLoading } = useMovieList('rating');

    const watchlistMovies = useMemo(
        () => movies.filter(m => watchlist.includes(m.id)),
        [movies, watchlist]
    );

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-20 h-20 mb-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                    <svg className="w-9 h-9 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Login to use your Watchlist</h2>
                <p className="text-gray-500 text-sm max-w-xs mb-8">
                    Your watchlist is saved per account. Login to start saving movies.
                </p>
                <Link to="/login" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/25">
                    Sign In
                </Link>
            </div>
        );
    }

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
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="w-20 h-20 mb-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                        <svg className="w-9 h-9 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h2>
                    <p className="text-gray-500 text-sm max-w-xs mb-8">Hit the ♥ button on any movie card to save it here for later.</p>
                    <Link to="/movies" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/25">
                        Browse Movies
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
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