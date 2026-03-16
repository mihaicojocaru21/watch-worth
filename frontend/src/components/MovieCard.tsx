import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types';
import { useWatchlist } from '../context/WatchlistContext';
import { useAuth } from '../context/AuthContext';

interface MovieCardProps {
    movie: Movie;
}

const FALLBACK_IMAGE = 'https://placehold.co/300x450/1f2937/6b7280?text=No+Poster';

const MovieCard = ({ movie }: MovieCardProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isInWatchlist, toggleWatchlist } = useWatchlist();
    const saved = isInWatchlist(movie.id);

    const handleWatchlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }
        toggleWatchlist(movie.id);
    };

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 cursor-pointer group">
            <div
                className="relative h-[300px] overflow-hidden bg-gray-700"
                onClick={() => navigate(`/movies/${movie.id}`)}
            >
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                    onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== FALLBACK_IMAGE) {
                            target.src = FALLBACK_IMAGE;
                        }
                    }}
                />

                {/* Rating badge */}
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-md text-yellow-400 font-bold flex items-center gap-1">
                    <span>★</span> {movie.rating}
                </div>

                {/* Watchlist button */}
                <button
                    onClick={handleWatchlist}
                    title={!user ? 'Login to save' : saved ? 'Remove from watchlist' : 'Add to watchlist'}
                    className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        saved
                            ? 'bg-red-500 text-white'
                            : 'bg-black/60 text-gray-300 hover:bg-black/80 hover:text-white'
                    }`}
                >
                    {saved ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="p-4">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    {movie.genre}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2 truncate">
                    {movie.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                    {movie.description}
                </p>

                <button
                    onClick={() => navigate(`/movies/${movie.id}`)}
                    className="mt-4 w-full py-2 bg-gray-700 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
                >
                    See Details
                </button>
            </div>
        </div>
    );
};

export default MovieCard;