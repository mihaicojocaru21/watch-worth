import MovieCard from '../components/MovieCard';
import { useMovieList } from '../hooks/useMovieList';
import ServerError from './ServerError';

const Movies = () => {
    const {
        movies,
        search,
        sortBy,
        loading,
        error,
        setSearch,
        setSortBy,
    } = useMovieList();

    if (error) return <ServerError />;

    return (
        <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-2">Movie Collection</h1>
                <p className="text-gray-400">Discover the latest reviews added on WatchWorth</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                    </span>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search movies..."
                        className="pl-9 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                </div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'year' | 'genre' | 'rating')}
                    className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                >
                    <option value="year">Sort by: Year</option>
                    <option value="genre">Sort by: Genre</option>
                    <option value="rating">Sort by: Rating</option>
                </select>
            </div>

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-gray-800 rounded-xl h-96 animate-pulse border border-gray-700" />
                    ))}
                </div>
            )}

            {!loading && movies.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center text-2xl">🎬</div>
                    <p className="text-gray-400 font-medium">No movies available at the moment.</p>
                    <p className="text-gray-600 text-sm mt-1">Try a different search term.</p>
                </div>
            )}

            {!loading && movies.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Movies;