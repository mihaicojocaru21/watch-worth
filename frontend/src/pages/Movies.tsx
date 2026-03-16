import { useState, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import { useMovieList } from '../hooks/useMovieList';
import ServerError from './ServerError';
import { MOCK_MOVIES } from '../data/mockData';

// Derive unique genres from mock data
const ALL_GENRES = ['All', ...Array.from(new Set(MOCK_MOVIES.map(m => m.genre))).sort()];
const MIN_YEAR = Math.min(...MOCK_MOVIES.map(m => m.year));
const MAX_YEAR = Math.max(...MOCK_MOVIES.map(m => m.year));

type SortOption = 'year' | 'genre' | 'rating' | 'title';

const Movies = () => {
    const { movies, loading, error } = useMovieList('', 'rating');

    // Local filter state
    const [search, setSearch]         = useState('');
    const [sortBy, setSortBy]         = useState<SortOption>('rating');
    const [genre, setGenre]           = useState('All');
    const [minRating, setMinRating]   = useState(0);
    const [yearFrom, setYearFrom]     = useState(MIN_YEAR);
    const [yearTo, setYearTo]         = useState(MAX_YEAR);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const activeFilterCount = [
        genre !== 'All',
        minRating > 0,
        yearFrom !== MIN_YEAR || yearTo !== MAX_YEAR,
    ].filter(Boolean).length;

    const filtered = useMemo(() => {
        let result = [...movies];

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(m =>
                m.title.toLowerCase().includes(q) ||
                m.genre.toLowerCase().includes(q)
            );
        }

        if (genre !== 'All') {
            result = result.filter(m => m.genre === genre);
        }

        result = result.filter(m => m.rating >= minRating);
        result = result.filter(m => m.year >= yearFrom && m.year <= yearTo);

        if (sortBy === 'year')   result.sort((a, b) => b.year - a.year);
        if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
        if (sortBy === 'genre')  result.sort((a, b) => a.genre.localeCompare(b.genre));
        if (sortBy === 'title')  result.sort((a, b) => a.title.localeCompare(b.title));

        return result;
    }, [movies, search, genre, minRating, yearFrom, yearTo, sortBy]);

    const resetFilters = () => {
        setSearch('');
        setSortBy('rating');
        setGenre('All');
        setMinRating(0);
        setYearFrom(MIN_YEAR);
        setYearTo(MAX_YEAR);
    };

    if (error) return <ServerError />;

    return (
        <div className="container mx-auto px-4 pb-12">

            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-2">Movie Collection</h1>
                <p className="text-gray-400">Discover the best films on WatchWorth</p>
            </div>

            {/* Search + Sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                {/* Search */}
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                    </span>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by title or genre..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                </div>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                >
                    <option value="rating">Sort: Rating</option>
                    <option value="year">Sort: Year</option>
                    <option value="title">Sort: Title A–Z</option>
                    <option value="genre">Sort: Genre</option>
                </select>

                {/* Toggle filters */}
                <button
                    onClick={() => setFiltersOpen(p => !p)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        filtersOpen || activeFilterCount > 0
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-white'
                    }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 8h12M9 12h6M12 16h0" />
                    </svg>
                    Filters
                    {activeFilterCount > 0 && (
                        <span className="bg-white text-blue-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {activeFilterCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Expandable filter panel */}
            {filtersOpen && (
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Genre */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">Genre</label>
                        <div className="flex flex-wrap gap-2">
                            {ALL_GENRES.map(g => (
                                <button
                                    key={g}
                                    onClick={() => setGenre(g)}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                                        genre === g
                                            ? 'bg-blue-600 border-blue-500 text-white'
                                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-white'
                                    }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Min rating */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">
                            Minimum Rating — <span className="text-yellow-400">{minRating > 0 ? `${minRating}+` : 'Any'}</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {[0, 7, 7.5, 8, 8.5, 9].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setMinRating(r)}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                                        minRating === r
                                            ? 'bg-yellow-500 border-yellow-400 text-gray-900'
                                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-white'
                                    }`}
                                >
                                    {r === 0 ? 'Any' : `${r}+`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Year range */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">
                            Year Range — <span className="text-blue-400">{yearFrom} – {yearTo}</span>
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                min={MIN_YEAR}
                                max={yearTo}
                                value={yearFrom}
                                onChange={e => setYearFrom(Number(e.target.value))}
                                className="w-24 p-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <span className="text-gray-500">–</span>
                            <input
                                type="number"
                                min={yearFrom}
                                max={MAX_YEAR}
                                value={yearTo}
                                onChange={e => setYearTo(Number(e.target.value))}
                                className="w-24 p-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Reset */}
                    {activeFilterCount > 0 && (
                        <div className="sm:col-span-2 lg:col-span-3 pt-2 border-t border-gray-700">
                            <button
                                onClick={resetFilters}
                                className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
                            >
                                ✕ Reset all filters
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Result count */}
            {!loading && (
                <p className="text-sm text-gray-500 mb-5">
                    Showing <span className="text-white font-semibold">{filtered.length}</span> movie{filtered.length !== 1 ? 's' : ''}
                </p>
            )}

            {/* Loading skeletons */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded-xl h-96 animate-pulse border border-gray-700" />
                    ))}
                </div>
            )}

            {/* Empty */}
            {!loading && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center text-2xl">🎬</div>
                    <p className="text-gray-400 font-medium">No movies match your filters.</p>
                    <button onClick={resetFilters} className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        Reset filters
                    </button>
                </div>
            )}

            {/* Grid */}
            {!loading && filtered.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Movies;