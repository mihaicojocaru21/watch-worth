import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useMovieList } from '../hooks/useMovieList';
import ServerError from './ServerError';
import { MOCK_MOVIES } from '../data/mockData';

const ALL_GENRES = Array.from(new Set(MOCK_MOVIES.map(m => m.genre))).sort();
const MIN_YEAR   = Math.min(...MOCK_MOVIES.map(m => m.year));
const MAX_YEAR   = Math.max(...MOCK_MOVIES.map(m => m.year));

type SortKey = 'rating' | 'year' | 'title' | 'genre';

const SORTS: { key: SortKey; label: string; icon: string }[] = [
    { key: 'rating', label: 'Top Rated', icon: '★' },
    { key: 'year',   label: 'Newest',    icon: '◷' },
    { key: 'title',  label: 'A – Z',     icon: 'Aa' },
    { key: 'genre',  label: 'Genre',     icon: '⊞' },
];

const RATING_PRESETS = [
    { label: 'Any',  value: 0   },
    { label: '7+',   value: 7   },
    { label: '7.5+', value: 7.5 },
    { label: '8+',   value: 8   },
    { label: '8.5+', value: 8.5 },
    { label: '9+',   value: 9   },
];

/* ── Dismissible filter chip ── */
const FilterChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-300">
        {label}
        <button
            onClick={onRemove}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-blue-400/30 transition-colors"
            aria-label={`Remove ${label} filter`}
        >
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </span>
);

export default function Movies() {
    const { movies, loading, error } = useMovieList('rating');
    const [searchParams] = useSearchParams();

    const [search,         setSearch]         = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortBy,         setSortBy]         = useState<SortKey>('rating');
    const [genre,          setGenre]          = useState('');
    const [minRating,      setMinRating]      = useState(0);
    const [yearFrom,       setYearFrom]       = useState(MIN_YEAR);
    const [yearTo,         setYearTo]         = useState(MAX_YEAR);
    const [panel,          setPanel]          = useState(false);

    // Debounce search input by 300ms to avoid jumpy re-renders on every keystroke
    useEffect(() => {
        const id = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(id);
    }, [search]);

    // Read ?genre= from URL on mount
    useEffect(() => {
        const g = searchParams.get('genre');
        if (g && ALL_GENRES.includes(g)) { setGenre(g); setPanel(true); }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const activeFilters = useMemo(() => {
        const chips: { label: string; onRemove: () => void }[] = [];
        if (genre)                                chips.push({ label: genre,                  onRemove: () => setGenre('')       });
        if (minRating > 0)                        chips.push({ label: `${minRating}+ stars`,  onRemove: () => setMinRating(0)    });
        if (yearFrom !== MIN_YEAR || yearTo !== MAX_YEAR)
            chips.push({ label: `${yearFrom}–${yearTo}`, onRemove: () => { setYearFrom(MIN_YEAR); setYearTo(MAX_YEAR); } });
        return chips;
    }, [genre, minRating, yearFrom, yearTo]);

    const reset = () => {
        setSearch(''); setDebouncedSearch(''); setSortBy('rating'); setGenre('');
        setMinRating(0); setYearFrom(MIN_YEAR); setYearTo(MAX_YEAR);
    };

    const filtered = useMemo(() => {
        let r = [...movies];
        const q = debouncedSearch.trim().toLowerCase();
        if (q)          r = r.filter(m => m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q));
        if (genre)       r = r.filter(m => m.genre === genre);
        r = r.filter(m => m.rating >= minRating && m.year >= yearFrom && m.year <= yearTo);
        if (sortBy === 'rating') r.sort((a, b) => b.rating - a.rating);
        if (sortBy === 'year')   r.sort((a, b) => b.year   - a.year);
        if (sortBy === 'title')  r.sort((a, b) => a.title.localeCompare(b.title));
        if (sortBy === 'genre')  r.sort((a, b) => a.genre.localeCompare(b.genre));
        return r;
    }, [movies, debouncedSearch, genre, minRating, yearFrom, yearTo, sortBy]);

    if (error) return <ServerError />;

    return (
        <div className="min-h-screen">

            {/* ── Page header ── */}
            <div className="relative overflow-hidden border-b border-gray-800">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-10 right-0 w-96 h-64 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

                <div className="relative container mx-auto px-4 pt-12 pb-10">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="h-px w-8 bg-blue-500 rounded-full" />
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Browse</span>
                            </div>
                            <h1 className="text-5xl font-black text-white tracking-tight leading-none mb-3">
                                Movie{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Collection</span>
                            </h1>
                            <p className="text-gray-500 text-sm">
                                {loading ? 'Loading catalogue…' : <>{filtered.length} <span className="text-gray-600">of</span> {movies.length} films</>}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold">Sort by</p>
                            <div className="flex flex-wrap gap-1.5">
                                {SORTS.map(s => (
                                    <button
                                        key={s.key}
                                        onClick={() => setSortBy(s.key)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                                            sortBy === s.key
                                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                                                : 'bg-gray-800/80 border-gray-700/80 text-gray-400 hover:text-white hover:border-gray-600'
                                        }`}
                                    >
                                        <span className={`text-[10px] font-black ${sortBy === s.key ? 'text-blue-200' : 'text-gray-600'}`}>{s.icon}</span>
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">

                {/* ── Toolbar ── */}
                <div className="flex flex-col sm:flex-row gap-3 py-5">
                    <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                            </svg>
                        </span>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search titles, genres…"
                            className="w-full pl-11 pr-10 py-3 bg-gray-800/70 border border-gray-700/80 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute inset-y-0 right-3.5 flex items-center text-gray-600 hover:text-gray-300 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => setPanel(p => !p)}
                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-semibold whitespace-nowrap transition-all ${
                            panel || activeFilters.length > 0
                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                                : 'bg-gray-800/70 border-gray-700/80 text-gray-400 hover:text-white hover:border-gray-600'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 8h12M10 12h4" />
                        </svg>
                        Filters
                        {activeFilters.length > 0 && (
                            <span className="bg-white text-blue-600 text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center leading-none">
                                {activeFilters.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* ── Active filter chips ── */}
                {activeFilters.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-4 -mt-1">
                        <span className="text-xs text-gray-600 font-semibold uppercase tracking-wider">Active:</span>
                        {activeFilters.map(chip => (
                            <FilterChip key={chip.label} label={chip.label} onRemove={chip.onRemove} />
                        ))}
                        <button
                            onClick={reset}
                            className="text-xs text-gray-600 hover:text-red-400 font-semibold transition-colors ml-1 underline underline-offset-2"
                        >
                            Clear all
                        </button>
                    </div>
                )}

                {/* ── Filter panel ── */}
                {panel && (
                    <div className="mb-6 rounded-2xl border border-gray-700/60 bg-gray-800/40 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 space-y-6">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-bold mb-3">Genre</p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setGenre('')}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                            !genre ? 'bg-gray-200 border-gray-200 text-gray-900' : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                                        }`}
                                    >All</button>
                                    {ALL_GENRES.map(g => (
                                        <button
                                            key={g}
                                            onClick={() => setGenre(g === genre ? '' : g)}
                                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                                genre === g ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                                            }`}
                                        >{g}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-bold mb-3">
                                        Min Rating
                                        {minRating > 0 && <span className="ml-2 text-yellow-400 normal-case font-black">★ {minRating}+</span>}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {RATING_PRESETS.map(p => (
                                            <button
                                                key={p.value}
                                                onClick={() => setMinRating(p.value)}
                                                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                                    minRating === p.value ? 'bg-yellow-500 border-yellow-400 text-gray-900' : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-yellow-700 hover:text-yellow-400'
                                                }`}
                                            >{p.label}</button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-bold mb-3">
                                        Year Range
                                        <span className="ml-2 text-blue-400 normal-case font-bold">{yearFrom} – {yearTo}</span>
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <input type="number" min={MIN_YEAR} max={yearTo} value={yearFrom}
                                               onChange={e => setYearFrom(Number(e.target.value))}
                                               className="w-24 px-3 py-2 rounded-xl bg-gray-900/60 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-all" />
                                        <span className="text-gray-600 font-bold">—</span>
                                        <input type="number" min={yearFrom} max={MAX_YEAR} value={yearTo}
                                               onChange={e => setYearTo(Number(e.target.value))}
                                               className="w-24 px-3 py-2 rounded-xl bg-gray-900/60 border border-gray-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Skeleton ── */}
                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden bg-gray-800/50 border border-gray-700/50 animate-pulse">
                                <div className="aspect-[2/3] bg-gray-700/50" />
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Empty state ── */}
                {!loading && filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-36 text-center">
                        <div className="w-20 h-20 mb-6 rounded-2xl bg-gray-800/80 border border-gray-700 flex items-center justify-center text-3xl">🎬</div>
                        <p className="text-xl font-black text-white mb-2">No results</p>
                        <p className="text-gray-500 text-sm mb-7 max-w-xs">No movies match your current filters. Try broadening your search.</p>
                        <button onClick={reset} className="px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm font-semibold text-gray-300 transition-all">
                            Reset filters
                        </button>
                    </div>
                )}

                {/* ── Grid ── */}
                {!loading && filtered.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {filtered.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}