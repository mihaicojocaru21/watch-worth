import { MOCK_MOVIES } from '../data/mockData';
import MovieCard from '../components/MovieCard';

const Movies = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-2">Movie Collection</h1>
                <p className="text-gray-400">Discover the latest reviews added on WatchWorth</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {MOCK_MOVIES.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {MOCK_MOVIES.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No movies available at the moment.
                </div>
            )}
        </div>
    );
};

export default Movies;