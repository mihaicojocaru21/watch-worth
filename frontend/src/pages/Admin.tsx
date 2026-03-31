import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import MovieForm from '../components/admin/MovieForm';
import type { MovieFormData } from '../components/admin/MovieForm';
import MovieTable from '../components/admin/MovieTable';
import { useMovies } from '../hooks/useMovies';
import type { Movie } from '../types';
import { tmdbService } from '../services/tmdbService';

const PLACEHOLDER_IMAGE = 'https://placehold.co/300x450/1f2937/6b7280?text=No+Poster';

// ── Styled confirm dialog ─────────────────────────────────────────────────────
const ConfirmDialog = ({
                           title,
                           message,
                           confirmLabel = 'Delete',
                           onConfirm,
                           onCancel,
                       }: {
    title:         string;
    message:       string;
    confirmLabel?: string;
    onConfirm:     () => void;
    onCancel:      () => void;
}) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
        <div className="relative bg-gray-800 border border-gray-700/80 rounded-2xl p-6 max-w-sm w-full shadow-2xl shadow-black/60 animate-page-in">
            <div className="w-11 h-11 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
            </div>
            <h3 className="text-lg font-black text-white mb-1">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{message}</p>
            <div className="flex items-center gap-3 justify-end">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-gray-600 transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-5 py-2 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg shadow-red-600/25"
                >
                    {confirmLabel}
                </button>
            </div>
        </div>
    </div>
);

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, accent, icon }: {
    label: string; value: string | number; sub?: string; accent: string; icon: React.ReactNode;
}) => (
    <div className="relative overflow-hidden bg-gray-800/50 border border-gray-700/60 rounded-2xl p-5 group hover:border-gray-600/60 transition-colors">
        <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-20 ${accent.split(' ')[0]}`} />
        <div className="relative flex items-start justify-between">
            <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">{label}</p>
                <p className="text-3xl font-black text-white leading-none">{value}</p>
                {sub && <p className="text-xs text-gray-600 mt-1.5">{sub}</p>}
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>{icon}</div>
        </div>
    </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const Admin = () => {
    const { movies, addMovie, updateMovie, deleteMovie, refresh } = useMovies();

    // ── TMDB Import state ─────────────────────────────────────────────────────
    const [importOpen,    setImportOpen]    = useState(false);
    const [importPages,   setImportPages]   = useState(1);
    const [importCat,     setImportCat]     = useState('popular');
    const [importLoading, setImportLoading] = useState(false);
    const [importResult,  setImportResult]  = useState<{ imported: number; skipped: number } | null>(null);

    const handleImport = async () => {
        setImportLoading(true);
        setImportResult(null);
        try {
            const res = await tmdbService.import(importPages, importCat);
            setImportResult(res);
            toast.success(`Imported ${res.imported} movies!`);
            refresh();
        } catch {
            toast.error('Import failed. Check TMDB API key.');
        } finally {
            setImportLoading(false);
        }
    };

    // ── Movie CRUD state ──────────────────────────────────────────────────────
    const [editingMovie,  setEditingMovie]  = useState<Movie | null>(null);
    const [formOpen,      setFormOpen]      = useState(false);
    const [confirmTarget, setConfirmTarget] = useState<Movie | null>(null);

    const GENRES = useMemo(
        () => Array.from(new Set(movies.map(m => m.genre))).sort(),
        [movies]
    );

    const onSubmit = async (data: MovieFormData) => {
        if (editingMovie) {
            await updateMovie(editingMovie.id, { ...data, tmdbId: data.tmdbId ?? editingMovie.tmdbId });
            toast.success(`"${data.title}" updated`);
            setEditingMovie(null);
            setFormOpen(false);
            return;
        }
        await addMovie({
            ...data,
            tmdbId:      data.tmdbId      ?? 0,
            description: data.description ?? 'No description available.',
            rating:      data.rating      ?? 7.0,
            image:       data.image       ?? PLACEHOLDER_IMAGE,
        });
        toast.success(`"${data.title}" added`);
        setFormOpen(false);
    };

    const onEdit = (movie: Movie) => {
        setEditingMovie(movie);
        setFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onDelete       = (movie: Movie) => setConfirmTarget(movie);
    const onCancel       = () => { setEditingMovie(null); setFormOpen(false); };

    const handleConfirmDelete = async () => {
        if (!confirmTarget) return;
        await deleteMovie(confirmTarget.id);
        toast.info(`"${confirmTarget.title}" deleted`);
        setConfirmTarget(null);
    };

    const avgRating = movies.length
        ? (movies.reduce((s, m) => s + m.rating, 0) / movies.length).toFixed(1)
        : '—';
    const topMovie = movies.length
        ? movies.reduce((a, b) => (b.rating > a.rating ? b : a))
        : null;

    return (
        <div className="min-h-screen">

            {/* ── Confirm dialog ── */}
            {confirmTarget && (
                <ConfirmDialog
                    title="Delete movie"
                    message={`Are you sure you want to delete "${confirmTarget.title}"? This action cannot be undone.`}
                    confirmLabel="Delete"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setConfirmTarget(null)}
                />
            )}

            {/* ── Header ── */}
            <div className="relative overflow-hidden border-b border-gray-800">
                <div className="absolute -top-16 right-0 w-80 h-64 bg-yellow-500/6 rounded-full blur-3xl pointer-events-none" />
                <div className="relative container mx-auto px-4 pt-12 pb-10">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="h-px w-8 bg-yellow-500 rounded-full" />
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">Control Panel</span>
                            </div>
                            <h1 className="text-5xl font-black text-white tracking-tight leading-none">
                                Admin{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Dashboard</span>
                            </h1>
                            <p className="text-gray-500 mt-2 text-sm">Manage your movie catalogue</p>
                        </div>

                        {/* ── Header buttons ── */}
                        <div className="flex items-center gap-3 self-start sm:self-end">
                            {/* Import TMDB */}
                            <button
                                onClick={() => { setImportOpen(p => !p); }}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                                    importOpen
                                        ? 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                Import TMDB
                            </button>

                            {/* Add Movie */}
                            <button
                                onClick={() => { if (formOpen && !editingMovie) onCancel(); else { setEditingMovie(null); setFormOpen(true); } }}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                                    formOpen && !editingMovie
                                        ? 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                                        : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20'
                                }`}
                            >
                                {formOpen && !editingMovie ? (
                                    <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>Cancel</>
                                ) : (
                                    <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Movie</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">

                {/* ── Stats ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-7">
                    <StatCard label="Total Movies" value={movies.length} sub={`${GENRES.length} genres`} accent="bg-blue-600/20 text-blue-400"
                              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>}
                    />
                    <StatCard label="Genres" value={GENRES.length} accent="bg-purple-600/20 text-purple-400"
                              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>}
                    />
                    <StatCard label="Avg Rating" value={`★ ${avgRating}`} accent="bg-yellow-500/20 text-yellow-400"
                              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>}
                    />
                    <StatCard label="Top Rated" value={topMovie ? topMovie.rating.toFixed(1) : '—'} sub={topMovie?.title} accent="bg-green-600/20 text-green-400"
                              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                    />
                </div>

                {/* ── TMDB Import Panel ── */}
                {importOpen && (
                    <div className="mb-8 rounded-2xl border border-purple-500/30 bg-purple-500/5 overflow-hidden">
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-purple-500/20">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <h2 className="text-base font-bold text-white">Import din TMDB</h2>
                            <p className="text-xs text-gray-500 ml-auto">Filmele duplicate sunt sărite automat</p>
                        </div>

                        <div className="p-6 flex flex-wrap items-end gap-4">
                            {/* Categorie */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Categorie</label>
                                <select
                                    value={importCat}
                                    onChange={e => setImportCat(e.target.value)}
                                    className="px-3.5 py-2.5 rounded-xl bg-gray-900/70 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                                >
                                    <option value="popular">Popular</option>
                                    <option value="top_rated">Top Rated</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="now_playing">Now Playing</option>
                                </select>
                            </div>

                            {/* Pagini */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Pagini TMDB <span className="text-gray-600 normal-case">(20 filme / pagină)</span>
                                </label>
                                <select
                                    value={importPages}
                                    onChange={e => setImportPages(Number(e.target.value))}
                                    className="px-3.5 py-2.5 rounded-xl bg-gray-900/70 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                                >
                                    {[1, 2, 3, 5, 10].map(n => (
                                        <option key={n} value={n}>
                                            {n} {n === 1 ? 'pagină' : 'pagini'} (~{n * 20} filme)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Start button */}
                            <button
                                onClick={handleImport}
                                disabled={importLoading}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-lg shadow-purple-600/20"
                            >
                                {importLoading ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                        </svg>
                                        Se importă...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                        </svg>
                                        Start Import
                                    </>
                                )}
                            </button>

                            {/* Rezultat */}
                            {importResult && (
                                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-sm">
                                    <span className="text-green-400 font-bold">✓ {importResult.imported} importate</span>
                                    <span className="text-gray-600">·</span>
                                    <span className="text-gray-400">{importResult.skipped} duplicate sărite</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Add / Edit form ── */}
                {(formOpen || editingMovie) && (
                    <div className="mb-8 rounded-2xl border border-gray-700/60 bg-gray-800/40 backdrop-blur-sm overflow-hidden">
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-700/50">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${editingMovie ? 'bg-blue-500/15 text-blue-400' : 'bg-green-500/15 text-green-400'}`}>
                                {editingMovie
                                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                }
                            </div>
                            <h2 className="text-base font-bold text-white">
                                {editingMovie ? `Editing: ${editingMovie.title}` : 'Add New Movie'}
                            </h2>
                        </div>
                        <div className="p-6">
                            <MovieForm
                                onSubmit={onSubmit}
                                initialValues={editingMovie ? {
                                    title:       editingMovie.title,
                                    year:        editingMovie.year,
                                    genre:       editingMovie.genre,
                                    rating:      editingMovie.rating,
                                    tmdbId:      editingMovie.tmdbId || undefined,
                                    image:       editingMovie.image,
                                    description: editingMovie.description,
                                } : undefined}
                                submitLabel={editingMovie ? 'Save Changes' : 'Add Movie'}
                                onCancel={onCancel}
                            />
                        </div>
                    </div>
                )}

                {/* ── Movie table ── */}
                <div className="rounded-2xl border border-gray-700/60 bg-gray-800/30 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50">
                        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                            All Movies
                            <span className="px-2 py-0.5 rounded-md bg-gray-700 text-white font-black text-xs">{movies.length}</span>
                        </h2>
                    </div>
                    <MovieTable movies={movies} onDelete={onDelete} onEdit={onEdit} />
                </div>
            </div>
        </div>
    );
};

export default Admin;