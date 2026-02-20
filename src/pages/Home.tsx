import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useMovieList } from '../hooks/useMovieList';
import ServerError from './ServerError';

const Home = () => {
    const {
        movies,
        search,
        sortBy,
        loading,
        error,
        setSearch,
        setSortBy,
    } = useMovieList();

    const featuredMovies = movies.slice(0, 3);

    if (error) return <ServerError />;

    return (
        <div className="space-y-16">
            <section className="text-center py-20 px-4 bg-gradient-to-b from-gray-800 to-transparent rounded-3xl mx-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
                    Find your next favorite movie.
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                    WatchWorth is the platform where reviews are honest and movies are hand-picked.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/movies" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/30">
                        Explore Movies
                    </Link>
                    <Link to="/login" className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold transition-all">
                        Login
                    </Link>
                </div>
            </section>

            <section className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white border-l-4 border-blue-500 pl-4">
                            Weekly Recommendations
                        </h2>
                        <p className="text-gray-400 mt-2">Browse by search or year.</p>
                    </div>

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
                </div>

                {loading && (
                    <div className="text-center text-gray-400 py-10">Loading movies...</div>
                )}

                {!loading && featuredMovies.length === 0 && (
                    <div className="text-center text-gray-500 py-10">No movies found.</div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {!loading &&
                        featuredMovies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                </div>
            </section>
        </div>
    );
};

export default Home;