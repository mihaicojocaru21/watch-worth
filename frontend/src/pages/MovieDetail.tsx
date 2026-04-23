import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { useWatchlist } from '../context/WatchlistContext';
import { useReviews } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import { usePoster } from '../hooks/usePoster';
import type { Movie } from '../types';

/* ── Improved Star picker ── */
const StarPicker = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
    const [hovered, setHovered] = useState(0);
    const active = hovered || value;
    return (
        <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(i => (
                <button
                    key={i}
                    type="button"
                    onClick={() => onChange(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-all duration-150 hover:scale-125 active:scale-95"
                >
                    <svg
                        className={`w-7 h-7 transition-colors duration-150 ${
                            i <= active ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-500'
                        }`}
                        fill="currentColor" viewBox="0 0 24 24"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </button>
            ))}
            {active > 0 && (
                <span className="ml-1 text-sm font-bold text-yellow-400">{active} / 5</span>
            )}
        </div>
    );
};

/* ── Star display (read-only) ── */
const StarDisplay = ({ value, size = 'sm' }: { value: number; size?: 'sm' | 'md' }) => {
    const cls = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className={`${cls} transition-colors ${i <= value ? 'text-yellow-400' : 'text-gray-700'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            ))}
        </div>
    );
};

/* ── Rating breakdown ── */
const RatingBreakdown = ({ reviews }: { reviews: { rating: number }[] }) => {
    const total = reviews.length;
    if (total === 0) return null;
    const avg = (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1);

    return (
        <div className="flex flex-col sm:flex-row items-start gap-6 p-5 rounded-2xl bg-gray-800/40 border border-gray-700/60 mb-8">
            {/* Average */}
            <div className="flex flex-col items-center justify-center shrink-0 min-w-[80px]">
                <span className="text-5xl font-black text-white leading-none">{avg}</span>
                <div className="mt-1.5">
                    <StarDisplay value={Math.round(Number(avg))} size="md" />
                </div>
                <span className="text-xs text-gray-500 mt-1.5">
                    {total} review{total !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="hidden sm:block w-px self-stretch bg-gray-700/60" />
            <div className="block sm:hidden w-full h-px bg-gray-700/60" />

            {/* Bars */}
            <div className="flex-1 w-full space-y-2">
                {[5, 4, 3, 2, 1].map(star => {
                    const count = reviews.filter(r => r.rating === star).length;
                    const pct   = total > 0 ? (count / total) * 100 : 0;
                    return (
                        <div key={star} className="flex items-center gap-2.5">
                            <div className="flex items-center gap-1 shrink-0 w-8">
                                <span className="text-xs text-gray-400 font-semibold">{star}</span>
                                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 rounded-full transition-all duration-700"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-500 w-4 text-right shrink-0">{count}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/* ── Main component ── */
const MovieDetail = () => {
    const { id }   = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isInWatchlist, toggleWatchlist } = useWatchlist();
    const { reviews, loadReviews, addReview, updateReview, deleteReview, getUserReview } = useReviews();

    const [movie,   setMovie]   = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    const [formOpen,   setFormOpen]   = useState(false);
    const [editingId,  setEditingId]  = useState<string | null>(null);
    const [starValue,  setStarValue]  = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [formError,  setFormError]  = useState('');

    const movieId = Number(id);

    useEffect(() => {
        if (!id || isNaN(movieId)) return;
        setLoading(true);
        movieService.getById(movieId).then(data => { setMovie(data); setLoading(false); });
        loadReviews(movieId);
    }, [id, loadReviews, movieId]);

    const posterSrc = usePoster(movie?.tmdbId ?? 0, movie?.title ?? '', movie?.image ?? '');

    const submitReview = async () => {
        if (starValue === 0)               { setFormError('Please select a star rating.'); return; }
        if (reviewText.trim().length < 10) { setFormError('Review must be at least 10 characters.'); return; }
        if (!user) return;
        try {
            if (editingId) await updateReview(editingId, starValue, reviewText.trim());
            else           await addReview(movieId, starValue, reviewText.trim());
            setFormOpen(false); setEditingId(null); setStarValue(0); setReviewText('');
        } catch (err: unknown) {
            setFormError(err instanceof Error ? err.message : 'Something went wrong.');
        }
    };

    const handleDelete = (reviewId: string) => {
        if (window.confirm('Delete your review?')) deleteReview(reviewId);
    };

    if (isNaN(movieId)) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Invalid movie ID</h2>
            <button onClick={() => navigate('/movies')} className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                Back to Movies
            </button>
        </div>
    );

    if (loading) return (
        <div className="container mx-auto px-4 py-12 max-w-5xl animate-pulse">
            <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-64 shrink-0 h-96 bg-gray-800 rounded-2xl" />
                <div className="flex-1 space-y-4 pt-4">
                    <div className="h-8 bg-gray-800 rounded w-2/3" />
                    <div className="h-4 bg-gray-800 rounded w-1/4" />
                    <div className="h-4 bg-gray-800 rounded w-full mt-6" />
                    <div className="h-4 bg-gray-800 rounded w-5/6" />
                </div>
            </div>
        </div>
    );

    if (!movie) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-5xl mb-4">🎬</p>
            <h2 className="text-2xl font-bold text-white mb-2">Movie not found</h2>
            <button onClick={() => navigate('/movies')} className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                Back to Movies
            </button>
        </div>
    );

    const saved    = isInWatchlist(movie.id);
    const myReview = user ? getUserReview(movieId, user.id) : undefined;
    const avgReview = reviews.length
        ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    const openAddForm  = () => { setEditingId(null); setStarValue(0); setReviewText(''); setFormError(''); setFormOpen(true); };
    const openEditForm = () => {
        if (!myReview) return;
        setEditingId(myReview.id); setStarValue(myReview.rating); setReviewText(myReview.text); setFormError(''); setFormOpen(true);
    };
    const cancelForm = () => { setFormOpen(false); setEditingId(null); setStarValue(0); setReviewText(''); setFormError(''); };

    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 -z-10 opacity-10 blur-3xl scale-110"
                 style={{ backgroundImage: `url(${posterSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

            <div className="container mx-auto px-4 py-10 max-w-5xl">

                <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                    <span className="text-sm font-medium">Back</span>
                </button>

                {/* ── Hero row ── */}
                <div className="flex flex-col md:flex-row gap-10 mb-16">
                    <div className="w-full md:w-64 shrink-0">
                        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-gray-700">
                            <img src={posterSrc} alt={movie.title} className="w-full object-cover" />
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-start pt-2">
                        <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/20 mb-4">
                            {movie.genre}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2">{movie.title}</h1>
                        <p className="text-gray-500 text-sm mb-5 font-medium tracking-wider uppercase">{movie.year}</p>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-800/60 border border-gray-700/50">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                <span className="text-white font-black">{movie.rating}</span>
                                <span className="text-gray-500 text-xs">/10 IMDb</span>
                            </div>
                            {avgReview && (
                                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-800/60 border border-gray-700/50">
                                    <StarDisplay value={Math.round(Number(avgReview))} size="md" />
                                    <span className="text-white font-black">{avgReview}</span>
                                    <span className="text-gray-500 text-xs">/5 · {reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => toggleWatchlist(movie.id)}
                            className={`self-start flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all mb-8 ${
                                saved ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20'
                                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600'
                            }`}
                        >
                            {saved ? (
                                <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>Saved to Watchlist</>
                            ) : (
                                <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>Add to Watchlist</>
                            )}
                        </button>

                        <div className="border-t border-gray-700/60 mb-6" />
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Synopsis</h3>
                        <p className="text-gray-300 leading-relaxed">{movie.description}</p>

                        <div className="mt-8 grid grid-cols-3 gap-3">
                            {[
                                { label: 'Year',   value: String(movie.year)     },
                                { label: 'Genre',  value: movie.genre            },
                                { label: 'Rating', value: `${movie.rating} / 10` },
                            ].map(({ label, value }) => (
                                <div key={label} className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{label}</p>
                                    <p className="text-white font-bold text-sm">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Reviews ── */}
                <div className="border-t border-gray-800 pt-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-white">
                            Reviews
                            {reviews.length > 0 && <span className="ml-3 text-base font-bold text-gray-500">({reviews.length})</span>}
                        </h2>

                        {user ? (
                            myReview ? (
                                <div className="flex items-center gap-2">
                                    <button onClick={openEditForm} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm text-gray-300 font-semibold transition-all">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(myReview.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-sm text-red-400 font-semibold transition-all">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                !formOpen && (
                                    <button onClick={openAddForm} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                                        Write a Review
                                    </button>
                                )
                            )
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-700 hover:border-blue-500/60 text-sm text-gray-400 hover:text-white font-semibold transition-all">
                                Sign in to review
                            </Link>
                        )}
                    </div>

                    {/* Rating breakdown */}
                    <RatingBreakdown reviews={reviews} />

                    {/* Form */}
                    {formOpen && (
                        <div className="mb-8 rounded-2xl border border-gray-700/60 bg-gray-800/40 backdrop-blur-sm overflow-hidden">
                            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-700/50">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-black text-white shrink-0">
                                    {user?.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-bold text-white">{user?.username}</span>
                                <span className="text-xs text-gray-600 ml-auto">{editingId ? 'Editing review' : 'New review'}</span>
                            </div>
                            <div className="p-6 space-y-5">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Your Rating</p>
                                    <StarPicker value={starValue} onChange={setStarValue} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Your Review</p>
                                    <textarea
                                        value={reviewText}
                                        onChange={e => { setReviewText(e.target.value); setFormError(''); }}
                                        rows={4}
                                        placeholder="What did you think about this film?"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                    />
                                    {formError && (
                                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                            {formError}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 pt-1">
                                    <button onClick={submitReview} className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
                                        {editingId ? 'Save Changes' : 'Post Review'}
                                    </button>
                                    <button onClick={cancelForm} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-white transition-colors">Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Review list */}
                    {reviews.length === 0 && !formOpen ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-gray-800">
                            <div className="w-12 h-12 mb-4 rounded-xl bg-gray-800/80 border border-gray-700 flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                </svg>
                            </div>
                            <p className="text-white font-bold mb-1">No reviews yet</p>
                            <p className="text-gray-600 text-sm">Be the first to share your thoughts.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map(review => {
                                const isOwn = user?.id === review.userId;
                                return (
                                    <div key={review.id} className={`rounded-2xl border p-6 transition-all ${isOwn ? 'bg-blue-500/5 border-blue-500/20' : 'bg-gray-800/40 border-gray-700/60'}`}>
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0 ${isOwn ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-gradient-to-br from-gray-600 to-gray-700'}`}>
                                                    {review.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-white">{review.username}</span>
                                                        {isOwn && <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-md">You</span>}
                                                    </div>
                                                    <p className="text-xs text-gray-600 mt-0.5">{formatDate(review.createdAt)}</p>
                                                </div>
                                            </div>
                                            <StarDisplay value={review.rating} />
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;