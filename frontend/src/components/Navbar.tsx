import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { watchlist } = useWatchlist();
    const { pathname } = useLocation();

    const linkClass = (path: string) =>
        `transition-colors ${
            pathname === path
                ? 'text-white font-semibold border-b border-blue-400 pb-0.5'
                : 'text-gray-400 hover:text-white'
        }`;

    return (
        <nav className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    WatchWorth
                </Link>

                <div className="flex gap-6 items-center">
                    <Link to="/" className={linkClass('/')}>Home</Link>
                    <Link to="/movies" className={linkClass('/movies')}>Movies</Link>

                    {/* Watchlist with badge */}
                    <Link to="/watchlist" className={`relative flex items-center gap-1 transition-colors ${
                        pathname === '/watchlist'
                            ? 'text-white font-semibold border-b border-red-400 pb-0.5'
                            : 'text-gray-400 hover:text-white'
                    }`}>
                        <svg className="w-4 h-4" fill={pathname === '/watchlist' || watchlist.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Watchlist
                        {watchlist.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                                {watchlist.length > 9 ? '9+' : watchlist.length}
                            </span>
                        )}
                    </Link>

                    {user?.role === 'admin' && (
                        <Link to="/admin" className={`font-bold transition-colors ${pathname === '/admin' ? 'text-yellow-300' : 'text-yellow-400 hover:text-yellow-300'}`}>
                            Admin Panel
                        </Link>
                    )}

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-white text-sm">Hi, {user.username}!</span>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;