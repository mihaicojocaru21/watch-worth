import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import { useTheme } from '../context/ThemeContext';

/* ── Sun / Moon icons ── */
const SunIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1"  x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1"  y1="12" x2="3"  y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
);

const MoonIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
);

const Navbar = () => {
    const { user, logout } = useAuth();
    const { watchlist } = useWatchlist();
    const { isDark, toggleTheme } = useTheme();
    const { pathname } = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <header className="sticky top-0 z-50">
                <div className="bg-gray-900/80 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/20">
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-6">

                        {/* ── Logo ── */}
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 shrink-0 group"
                            onClick={() => setMobileOpen(false)}
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V4h-4z"/>
                                </svg>
                            </div>
                            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 tracking-tight">
                                WatchWorth
                            </span>
                        </Link>

                        {/* ── Desktop nav links ── */}
                        <nav className="hidden md:flex items-center gap-1">
                            {[
                                { to: '/',         label: 'Home'        },
                                { to: '/movies',   label: 'Movies'      },
                                { to: '/upcoming', label: 'Coming Soon' },
                            ].map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        isActive(to)
                                            ? 'text-white bg-white/8'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {label}
                                    {isActive(to) && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-400 rounded-full" />
                                    )}
                                </Link>
                            ))}

                            {/* Watchlist */}
                            <Link
                                to="/watchlist"
                                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive('/watchlist')
                                        ? 'text-white bg-white/8'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <svg
                                    className={`w-3.5 h-3.5 transition-colors ${watchlist.length > 0 ? 'text-red-400' : 'text-current'}`}
                                    fill={watchlist.length > 0 ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Watchlist
                                {watchlist.length > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
                                        {watchlist.length > 9 ? '9+' : watchlist.length}
                                    </span>
                                )}
                                {isActive('/watchlist') && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-400 rounded-full" />
                                )}
                            </Link>

                            {/* Admin */}
                            {user?.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        isActive('/admin')
                                            ? 'text-yellow-300 bg-yellow-500/10'
                                            : 'text-yellow-400/80 hover:text-yellow-300 hover:bg-yellow-500/5'
                                    }`}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Admin
                                </Link>
                            )}
                        </nav>

                        {/* ── Desktop right side ── */}
                        <div className="hidden md:flex items-center gap-2">

                            {/* ── Theme toggle ── */}
                            <button
                                onClick={toggleTheme}
                                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                            >
                                {isDark ? <SunIcon /> : <MoonIcon />}
                            </button>

                            {user ? (
                                <>
                                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-black text-white shrink-0">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm text-gray-300 font-medium max-w-[100px] truncate">
                                            {user.username}
                                        </span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all font-medium"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Sign In
                                </Link>
                            )}
                        </div>

                        {/* ── Mobile right: theme + hamburger ── */}
                        <div className="md:hidden flex items-center gap-1">
                            <button
                                onClick={toggleTheme}
                                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                {isDark ? <SunIcon /> : <MoonIcon />}
                            </button>
                            <button
                                className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
                                onClick={() => setMobileOpen(p => !p)}
                                aria-label="Toggle menu"
                            >
                                <span className={`block w-5 h-0.5 bg-gray-400 rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`block w-5 h-0.5 bg-gray-400 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                                <span className={`block w-5 h-0.5 bg-gray-400 rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Mobile drawer ── */}
                {mobileOpen && (
                    <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-b border-white/5 px-4 py-4 space-y-1">
                        {[
                            { to: '/',         label: 'Home'        },
                            { to: '/movies',   label: 'Movies'      },
                            { to: '/upcoming', label: 'Coming Soon' },
                            { to: '/watchlist', label: 'Watchlist'  },
                        ].map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                    isActive(to)
                                        ? 'bg-white/10 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {label}
                                {label === 'Watchlist' && watchlist.length > 0 && (
                                    <span className="ml-auto bg-red-500 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                                        {watchlist.length > 9 ? '9+' : watchlist.length}
                                    </span>
                                )}
                            </Link>
                        ))}

                        {user?.role === 'admin' && (
                            <Link
                                to="/admin"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-yellow-400 hover:bg-yellow-500/5 transition-all"
                            >
                                Admin Panel
                            </Link>
                        )}

                        <div className="pt-3 border-t border-white/5 mt-3">
                            {user ? (
                                <div className="flex items-center justify-between px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-black text-white">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm text-gray-300 font-medium">{user.username}</span>
                                    </div>
                                    <button
                                        onClick={() => { logout(); setMobileOpen(false); }}
                                        className="text-sm text-gray-500 hover:text-white transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Navbar;