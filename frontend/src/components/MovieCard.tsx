import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types';
import { useWatchlist } from '../context/WatchlistContext';
import { useAuth } from '../context/AuthContext';

interface MovieCardProps {
    movie: Movie;
    rank?: number;
}

const FALLBACK_IMAGE = 'https://placehold.co/300x450/1f2937/6b7280?text=No+Poster';

const MovieCard = ({ movie, rank }: MovieCardProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isInWatchlist, toggleWatchlist } = useWatchlist();
    const saved = isInWatchlist(movie.id);

    const handleWatchlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) { navigate('/login'); return; }
        toggleWatchlist(movie.id);
    };

    return (
        <div
            onClick={() => navigate(`/movies/${movie.id}`)}
            className="group relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer border border-white/5 shadow-xl shadow-black/30 hover:shadow-black/50 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Poster */}
            <img
                src={movie.image}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={e => {
                    const t = e.currentTarget;
                    if (t.src !== FALLBACK_IMAGE) t.src = FALLBACK_IMAGE;
                }}
            />

            {/* Persistent vignette — top fade for buttons */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

            {/* Hover reveal — bottom info overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* ── Top row: heart + rating ── */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3">
                {/* Heart */}
                <button
                    onClick={handleWatchlist}
                    title={!user ? 'Login to save' : saved ? 'Remove from watchlist' : 'Add to watchlist'}
                    className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                        saved
                            ? 'bg-red-500/90 text-white scale-110'
                            : 'bg-black/40 text-white/60 hover:bg-black/60 hover:text-white'
                    }`}
                >
                    {saved ? (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    )}
                </button>

                {/* Rating */}
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="text-white text-xs font-black">{movie.rating.toFixed(1)}</span>
                </div>
            </div>

            {/* ── Bottom info — visible only on hover ── */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1.5">
                    {rank !== undefined && (
                        <span className="text-[10px] font-black text-white/40 tracking-widest">#{rank}</span>
                    )}
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider truncate">
                        {movie.genre}
                    </span>
                    <span className="text-[10px] text-white/30 ml-auto shrink-0">{movie.year}</span>
                </div>
                <h3 className="text-white font-black text-sm leading-tight line-clamp-2 mb-3">
                    {movie.title}
                </h3>
                <button
                    onClick={e => { e.stopPropagation(); navigate(`/movies/${movie.id}`); }}
                    className="w-full py-2 rounded-xl bg-white/10 hover:bg-blue-600 backdrop-blur-sm text-white text-xs font-bold border border-white/10 hover:border-blue-500 transition-all duration-200"
                >
                    See Details
                </button>
            </div>
        </div>
    );
};

export default MovieCard;