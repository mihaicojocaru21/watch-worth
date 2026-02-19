import type { Movie } from '../types';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:transform hover:scale-105 transition-all duration-300 border border-gray-700 cursor-pointer group">
            <div className="relative h-[300px] overflow-hidden">
                <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-md text-yellow-400 font-bold flex items-center gap-1">
                    <span>★</span> {movie.rating}
                </div>
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

                <button className="mt-4 w-full py-2 bg-gray-700 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium">
                    Vezi detalii
                </button>
            </div>
        </div>
    );
};

export default MovieCard;