import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import { useUserStats } from '../hooks/useUserStats';
import { usePoster } from '../hooks/usePoster';
import { useReviews } from '../context/ReviewContext';
import { useMovieList } from '../hooks/useMovieList';
import type { Movie } from '../types';

// ── Avatar with big initials ────────────────────────────────────────────────
const Avatar = ({ name, size = 'lg' }: { name: string; size?: 'sm' | 'lg' }) => {
    const initials = name.slice(0, 2).toUpperCase();
    const cls = size === 'lg'
        ? 'w-20 h-20 text-2xl font-black'
        : 'w-10 h-10 text-sm font-black';
    return (
        <div className={`${cls} rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20`}>
            {initials}
        </div>
    );
};

// ── Star display ─────────────────────────────────────────────────────────────
const Stars = ({ value }: { value: number }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
            <svg key={i} className={`w-3 h-3 ${i <= value ? 'text-yellow-400' : 'text-gray-700'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
        ))}
    </div>
);

// ── Watchlist movie card (small) ─────────────────────────────────────────────
const WatchlistCard = ({ movie }: { movie: Movie }) => {
    const navigate = useNavigate();
    const posterSrc = usePoster(movie.tmdbId, movie.title, movie.image);
    return (
        <button
            onClick={() => navigate(`/movies/${movie.id}`)}
            className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 duration-200"
        >
            <img src={posterSrc} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-[10px] font-bold leading-tight line-clamp-2">{movie.title}</p>
            </div>
        </button>
    );
};

// ── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon }: { label: string; value: string | number; sub?: string; icon: React.ReactNode }) => (
    <div className="bg-gray-800/50 border border-gray-700/60 rounded-2xl p-5">
        <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{label}</p>
            <div className="w-8 h-8 rounded-lg bg-gray-700/60 flex items-center justify-center text-gray-400">
                {icon}
            </div>
        </div>
        <p className="text-3xl font-black text-white leading-none">{value}</p>
        {sub && <p className="text-xs text-gray-600 mt-1.5">{sub}</p>}
    </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { watchlist } = useWatchlist();
    const { reviews } = useReviews();
    const { movies, loading: moviesLoading } = useMovieList('rating');

    // Pass API movies so stats are always in sync with the real catalogue
    const stats = useUserStats(user?.id, watchlist, reviews, movies);

    const [editingName, setEditingName] = useState(false);
    const [nameInput, setNameInput] = useState(user?.username ?? '');
    const [displayName, setDisplayName] = useState(() => {
        if (!user?.id) return user?.username ?? '';
        return localStorage.getItem(`watchworth_displayname_${user.id}`) ?? user?.username ?? '';
    });

    const saveName = () => {
        const trimmed = nameInput.trim();
        if (!trimmed || !user?.id) return;
        setDisplayName(trimmed);
        localStorage.setItem(`watchworth_displayname_${user.id}`, trimmed);
        setEditingName(false);
    };

    const watchlistPreview = useMemo(
        () => watchlist.slice(0, 8),
        [watchlist]
    );

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-16 h-16 mb-4 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                    <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Sign in to see your profile</h2>
                <p className="text-gray-500 text-sm mb-8 max-w-xs">Your stats, reviews and watchlist all live here.</p>
                <Link to="/login" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all">
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen">

            {/* ── Header banner ── */}
            <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 bg-gray-900">
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative container mx-auto px-4 pt-12 pb-10">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-6">

                        <Avatar name={displayName} size="lg" />

                        <div className="flex-1 min-w-0">
                            {/* Name + edit */}
                            {editingName ? (
                                <div className="flex items-center gap-2 mb-1">
                                    <input
                                        value={nameInput}
                                        onChange={e => setNameInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditingName(false); }}
                                        autoFocus
                                        maxLength={30}
                                        className="text-2xl font-black bg-transparent border-b border-blue-400 text-white focus:outline-none w-48"
                                    />
                                    <button onClick={saveName} className="text-blue-400 hover:text-blue-300 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                    <button onClick={() => setEditingName(false)} className="text-gray-600 hover:text-gray-400 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2.5 mb-1 group/name">
                                    <h1 className="text-2xl font-black text-white">{displayName}</h1>
                                    <button
                                        onClick={() => { setNameInput(displayName); setEditingName(true); }}
                                        className="opacity-0 group-hover/name:opacity-100 text-gray-600 hover:text-gray-300 transition-all"
                                        title="Edit display name"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            <p className="text-gray-500 text-sm">{user.email}</p>

                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${
                                    user.role === 'admin'
                                        ? 'bg-yellow-500/10 border-yellow-500/25 text-yellow-400'
                                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'admin' ? 'bg-yellow-400' : 'bg-amber-400'}`} />
                                    {user.role}
                                </span>
                                {stats.favoriteGenre && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border bg-gray-800 border-gray-700 text-gray-400">
                                        ♥ {stats.favoriteGenre}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Quick actions */}
                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                to="/watchlist"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm text-gray-300 font-semibold transition-all"
                            >
                                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                Watchlist
                            </Link>
                            <Link
                                to="/movies"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
                            >
                                Discover
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 pb-16 space-y-12">

                {/* ── Stats grid ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        label="Watchlist"
                        value={stats.watchlistCount}
                        sub={stats.watchlistCount === 1 ? '1 film saved' : `${stats.watchlistCount} films saved`}
                        icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                    />
                    <StatCard
                        label="Reviews"
                        value={stats.reviewCount}
                        sub={stats.reviewCount === 1 ? '1 review written' : `${stats.reviewCount} reviews written`}
                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>}
                    />
                    <StatCard
                        label="Avg rating"
                        value={stats.avgRatingGiven !== null ? `★ ${stats.avgRatingGiven}` : '—'}
                        sub="out of 5 stars"
                        icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                    />
                    <StatCard
                        label="Fav genre"
                        value={stats.favoriteGenre ?? '—'}
                        sub={stats.favoriteGenre ? 'most saved / reviewed' : 'save some films first'}
                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>}
                    />
                </div>

                {/* ── Watchlist preview ── */}
                {moviesLoading && watchlist.length > 0 && (
                    <div>
                        <div className="h-6 w-28 rounded-lg bg-gray-800/80 mb-5 animate-pulse" />
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                            {Array.from({ length: Math.min(watchlist.length, 8) }).map((_, i) => (
                                <div key={i} className="aspect-[2/3] rounded-xl bg-gray-800/50 border border-gray-700/50 animate-pulse" />
                            ))}
                        </div>
                    </div>
                )}
                {!moviesLoading && watchlistPreview.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-black text-white">Watchlist</h2>
                            {watchlist.length > 8 && (
                                <Link to="/watchlist" className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1">
                                    View all {watchlist.length}
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            )}
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                            {watchlistPreview
                                .map(id => movies.find(m => String(m.id) === String(id)))
                                .filter(Boolean)
                                .map(movie => <WatchlistCard key={movie!.id} movie={movie!} />)
                            }
                        </div>
                    </div>
                )}

                {/* ── Reviews ── */}
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-black text-white">
                            Your Reviews
                            {stats.reviewCount > 0 && (
                                <span className="ml-2 text-base font-bold text-gray-600">({stats.reviewCount})</span>
                            )}
                        </h2>
                    </div>

                    {stats.reviews.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-gray-800 text-center">
                            <div className="w-12 h-12 mb-4 rounded-xl bg-gray-800/80 border border-gray-700 flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                </svg>
                            </div>
                            <p className="text-white font-bold mb-1">No reviews yet</p>
                            <p className="text-gray-600 text-sm mb-5">Find a film you've watched and share your thoughts.</p>
                            <Link
                                to="/movies"
                                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all"
                            >
                                Browse movies
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {stats.reviews.map((review, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigate(`/movies/${review.movieId}`)}
                                    className="group w-full text-left rounded-2xl border border-gray-700/60 bg-gray-800/40 hover:bg-gray-800/70 hover:border-gray-600/80 p-5 transition-all duration-200"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <h3 className="text-white font-bold text-sm group-hover:text-amber-300 transition-colors truncate">
                                                    {review.movieTitle}
                                                </h3>
                                                <span className="shrink-0 px-2 py-0.5 rounded-md bg-gray-900/60 border border-gray-700 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                                                    {review.genre}
                                                </span>
                                            </div>
                                            <Stars value={review.rating} />
                                            <p className="text-gray-500 text-sm leading-relaxed mt-2 line-clamp-2">{review.text}</p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="text-xs text-gray-600">{formatDate(review.createdAt)}</p>
                                            <svg className="w-4 h-4 text-gray-700 group-hover:text-blue-400 mt-2 ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;