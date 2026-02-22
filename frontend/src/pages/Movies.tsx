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
        simulateError,
    } = useMovieList();

    if (error) return <ServerError />;

    return (
        <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-2">Movie Collection</h1>
                <p className="text-gray-400">Discover the latest reviews added on WatchWorth</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-6 justify-between">
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search movies..."
                        className="px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                    />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as '' | 'year')}
                        className="px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
                    >
                        <option value="">Sort: Default</option>
                        <option value="year">Sort: Year</option>
                    </select>
                </div>

                <button
                    onClick={simulateError}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold"
                >
                    Simulate 500 Error
                </button>
            </div>

            {loading && (
                <div className="text-center text-gray-400 py-10">Loading movies...</div>
            )}

            {!loading && movies.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No movies available at the moment.
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {!loading &&
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
            </div>
        </div>
    );
};

export default Movies;