import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useMovieList } from '../hooks/useMovieList';
import { usePoster } from '../hooks/usePoster';
import { useAuth } from '../context/AuthContext';
import ServerError from './ServerError';
import type { Movie } from '../types';

// ── Hero card — separate component so usePoster hook is called at top level ──
const HeroCard = ({ movie }: { movie: Movie }) => {
    const posterSrc = usePoster(movie.tmdbId, movie.title, movie.image);
    return (
        <Link
            to={`/movies/${movie.id}`}
            className="group relative flex overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-800/40 hover:border-blue-500/40 transition-all duration-300 h-56 sm:h-64"
        >
            <div
                className="absolute inset-0 bg-cover bg-center scale-105 blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundImage: `url(${posterSrc})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent" />

            <div className="relative flex items-center gap-6 p-6 sm:p-8 flex-1 min-w-0">
                <div className="shrink-0 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">#1</span>
                    <span className="text-5xl font-black text-white/10 leading-none select-none">01</span>
                </div>

                <div className="shrink-0 w-24 sm:w-28 aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    <img
                        src={posterSrc}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x450/1f2937/6b7280?text=No+Poster'; }}
                    />
                </div>

                <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/25 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                            {movie.genre}
                        </span>
                        <span className="text-gray-600 text-xs">{movie.year}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2 truncate">
                        {movie.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed hidden sm:block">
                        {movie.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-3">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-white font-black text-sm">{movie.rating.toFixed(1)}</span>
                        <span className="text-gray-600 text-xs">/ 10</span>
                    </div>
                </div>
            </div>

            <div className="relative hidden sm:flex items-center pr-8 text-gray-700 group-hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
};

// ── Why WatchWorth features ──────────────────────────────────────────────────
const WHY_FEATURES = [
    {
        icon: (
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        accent: 'bg-blue-500/10 border-blue-500/20',
        sweep: 'from-blue-500/60',
        title: 'Hand-picked',
        description: 'Every title is reviewed by real film enthusiasts — no auto-generated lists.',
    },
    {
        icon: (
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        accent: 'bg-purple-500/10 border-purple-500/20',
        sweep: 'from-purple-500/60',
        title: 'Always fresh',
        description: 'New recommendations drop every week across all genres and moods.',
    },
    {
        icon: (
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        accent: 'bg-green-500/10 border-green-500/20',
        sweep: 'from-green-500/60',
        title: 'No clutter',
        description: 'Clean, ad-free interface so you can focus on discovering great films.',
    },
];

const Home = () => {
    const { movies, loading, error } = useMovieList('rating');
    const { user } = useAuth();

    const featuredMovies = movies.slice(0, 17);

    if (error) return <ServerError />;

    return (
        <div className="space-y-20">

            {/* ── Hero ── */}
            <section className="relative overflow-hidden rounded-3xl mx-4 mt-4 px-8 py-24 text-center bg-gray-900">
                <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

                <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    ✦ Curated reviews, zero noise
                </span>

                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 leading-tight mb-5">
                    Find your next<br className="hidden md:block" /> favourite movie.
                </h1>

                <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                    WatchWorth surfaces hand-picked films with honest ratings — no algorithms, no ads, just great cinema.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/movies"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    >
                        Explore Movies
                    </Link>
                    {!user && (
                        <Link
                            to="/login"
                            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold transition-all"
                        >
                            Sign In
                        </Link>
                    )}
                </div>

                <div className="mt-14 flex flex-wrap justify-center gap-10 text-center">
                    {[
                        { label: 'Movies',  value: '500+'   },
                        { label: 'Genres',  value: '20+'    },
                        { label: 'Reviews', value: '1,200+' },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <p className="text-2xl font-extrabold text-white">{value}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Weekly Picks ── */}
            <section className="container mx-auto px-4">

                {/* Section header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-blue-500/8 border border-blue-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-400">Updated this week</span>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tight leading-none">
                            Weekly<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                Recommendations
                            </span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm">
                            Our editors' top picks — curated fresh every week.
                        </p>
                    </div>

                    <Link
                        to="/movies"
                        className="hidden sm:inline-flex self-end items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-700 hover:border-blue-500/60 bg-gray-800/60 hover:bg-gray-800 text-gray-400 hover:text-white text-sm font-semibold transition-all whitespace-nowrap"
                    >
                        View all
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Loading skeletons */}
                {loading && (
                    <div className="space-y-5">
                        <div className="h-64 rounded-2xl bg-gray-800/50 animate-pulse border border-gray-700/50" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="aspect-[2/3] rounded-xl bg-gray-800/50 animate-pulse border border-gray-700/50" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty */}
                {!loading && featuredMovies.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 mb-4 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-2xl">🎬</div>
                        <p className="text-gray-400 font-medium">No movies found.</p>
                    </div>
                )}

                {/* Featured layout: 1 hero + 8 grid */}
                {!loading && featuredMovies.length > 0 && (() => {
                    const [hero, ...rest] = featuredMovies;
                    return (
                        <div className="space-y-5">

                            {/* Hero card — #1 pick */}
                            <HeroCard movie={hero} />

                            {/* Grid of remaining 8 */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {rest.map((movie, i) => (
                                    <MovieCard key={movie.id} movie={movie} rank={i + 2} />
                                ))}
                            </div>
                        </div>
                    );
                })()}

                {/* Mobile "View all" */}
                {!loading && featuredMovies.length > 0 && (
                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            to="/movies"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white text-sm font-semibold transition-all"
                        >
                            View full collection
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </section>

            {/* ── Why WatchWorth ── */}
            <section className="container mx-auto px-4 pb-16">
                {/* Section label */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 shrink-0">Why WatchWorth</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {WHY_FEATURES.map(({ icon, accent, sweep, title, description }) => (
                        <div
                            key={title}
                            className="group relative overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-800/40 p-7 hover:bg-gray-800/60 transition-all duration-300"
                        >
                            <div className="relative">
                                {/* Icon circle */}
                                <div className={`w-11 h-11 mb-5 rounded-full border flex items-center justify-center ${accent}`}>
                                    {icon}
                                </div>

                                {/* Divider */}
                                <div className="w-8 h-px bg-gray-700 mb-5" />

                                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                            </div>

                            {/* Bottom sweep on hover */}
                            <div className={`absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r ${sweep} to-transparent group-hover:w-full transition-all duration-500`} />
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Home;