import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../services/movieService';
import type { Movie } from '../types';

const FALLBACK_IMAGE = 'https://placehold.co/400x600/1f2937/6b7280?text=No+Poster';

const StarRating = ({ rating }: { rating: number }) => {
    const filled = Math.round(rating / 2); // 0–10 → 0–5 stars
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className={`text-xl ${i <= filled ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
            ))}
            <span className="ml-2 text-yellow-400 font-bold text-lg">{rating}</span>
            <span className="text-gray-500 text-sm">/10</span>
        </div>
    );
};

const MovieDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        movieService.getById(Number(id)).then(data => {
            setMovie(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 animate-pulse">
                    <div className="w-full md:w-72 shrink-0 h-[420px] bg-gray-800 rounded-2xl" />
                    <div className="flex-1 space-y-4 pt-4">
                        <div className="h-8 bg-gray-800 rounded w-2/3" />
                        <div className="h-4 bg-gray-800 rounded w-1/4" />
                        <div className="h-4 bg-gray-800 rounded w-full mt-6" />
                        <div className="h-4 bg-gray-800 rounded w-5/6" />
                        <div className="h-4 bg-gray-800 rounded w-4/6" />
                    </div>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <p className="text-5xl mb-4">🎬</p>
                <h2 className="text-2xl font-bold text-white mb-2">Movie not found</h2>
                <button onClick={() => navigate('/movies')} className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Back to Movies
                </button>
            </div>
        );
    }

    const posterSrc = imgError ? FALLBACK_IMAGE : movie.image;

    return (
        <div className="relative min-h-screen">

            {/* Blurred backdrop */}
            <div
                className="absolute inset-0 -z-10 opacity-10 blur-3xl scale-110"
                style={{ backgroundImage: `url(${posterSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />

            <div className="container mx-auto px-4 py-10 max-w-5xl">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="text-sm font-medium">Back</span>
                </button>

                {/* Main content */}
                <div className="flex flex-col md:flex-row gap-10">

                    {/* Poster */}
                    <div className="w-full md:w-72 shrink-0">
                        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-gray-700">
                            <img
                                src={posterSrc}
                                alt={movie.title}
                                className="w-full object-cover"
                                onError={() => setImgError(true)}
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-start pt-2">

                        {/* Genre badge */}
                        <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-500/15 text-blue-400 border border-blue-500/20 mb-4">
                            {movie.genre}
                        </span>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2">
                            {movie.title}
                        </h1>

                        {/* Year */}
                        <p className="text-gray-500 text-sm mb-5 font-medium tracking-wider uppercase">
                            {movie.year}
                        </p>

                        {/* Rating */}
                        <div className="mb-8">
                            <StarRating rating={movie.rating} />
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-700/60 mb-6" />

                        {/* Description */}
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Synopsis</h3>
                            <p className="text-gray-300 leading-relaxed text-base">
                                {movie.description}
                            </p>
                        </div>

                        {/* Meta row */}
                        <div className="mt-10 grid grid-cols-3 gap-4">
                            {[
                                { label: 'Year',   value: String(movie.year)   },
                                { label: 'Genre',  value: movie.genre           },
                                { label: 'Rating', value: `${movie.rating} / 10` },
                            ].map(({ label, value }) => (
                                <div key={label} className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{label}</p>
                                    <p className="text-white font-bold">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;