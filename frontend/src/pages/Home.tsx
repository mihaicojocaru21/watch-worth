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
        <div className="space-y-20">

            {/* ── Hero ── */}
            <section className="relative overflow-hidden rounded-3xl mx-4 mt-4 px-8 py-24 text-center bg-gray-900">
                {/* Decorative blobs */}
                <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

                {/* Badge */}
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
                    <Link
                        to="/login"
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold transition-all"
                    >
                        Sign In
                    </Link>
                </div>

                {/* Stats row */}
                <div className="mt-14 flex flex-wrap justify-center gap-10 text-center">
                    {[
                        { label: 'Movies', value: '500+' },
                        { label: 'Genres', value: '20+' },
                        { label: 'Reviews', value: '1 200+' },
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
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">This week</p>
                        <h2 className="text-3xl font-bold text-white">
                            Weekly Recommendations
                        </h2>
                        <p className="text-gray-400 mt-1 text-sm">Explore by title, genre or popularity.</p>
                    </div>

                    {/* Search + Sort */}
                    <div className="flex flex-col sm:flex-row gap-3">
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
                                className="pl-9 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm w-52"
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
                </div>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-gray-800 rounded-xl h-96 animate-pulse border border-gray-700" />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && featuredMovies.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center text-2xl">🎬</div>
                        <p className="text-gray-400 font-medium">No movies found.</p>
                        <p className="text-gray-600 text-sm mt-1">Try a different search term.</p>
                    </div>
                )}

                {/* Cards */}
                {!loading && featuredMovies.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredMovies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                {/* See all CTA */}
                {!loading && featuredMovies.length > 0 && (
                    <div className="mt-10 text-center">
                        <Link
                            to="/movies"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-700 hover:border-blue-500 text-gray-400 hover:text-white text-sm font-medium transition-all"
                        >
                            View full collection
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </section>

            {/* ── Why WatchWorth ── */}
            <section className="container mx-auto px-4 pb-8">
                <div className="rounded-2xl bg-gray-800/50 border border-gray-700/50 p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {[
                        { icon: '🎯', title: 'Hand-picked', desc: 'Every title is reviewed by real film enthusiasts — no auto-generated lists.' },
                        { icon: '⚡', title: 'Always fresh', desc: 'New recommendations drop every week across all genres and moods.' },
                        { icon: '🔒', title: 'No clutter', desc: 'Clean, ad-free interface so you can focus on discovering great films.' },
                    ].map(({ icon, title, desc }) => (
                        <div key={title} className="flex flex-col items-center gap-3">
                            <span className="text-3xl">{icon}</span>
                            <h3 className="text-white font-bold text-lg">{title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Home;