import { useEffect, useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 border border-gray-700 hover:border-blue-500 text-gray-400 hover:text-white shadow-lg shadow-black/30 hover:shadow-blue-600/20 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

const Footer = () => (
    <footer className="bg-gray-950 border-t border-gray-800/60">

        {/* ── Main grid ── */}
        <div className="container mx-auto px-6 pt-12 pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* ── Brand column ── */}
                <div>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform duration-200">
                            <svg width="20" height="18" viewBox="0 0 24 22" fill="none">
                                <rect x="2" y="8" width="20" height="13" rx="2" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="1.4"/>
                                <path d="M2 8 L22 8 L19 3 L2 3 Z" fill="white" fillOpacity="0.9"/>
                                <line x1="6"  y1="3" x2="5"  y2="8" stroke="#1e293b" strokeWidth="1.5"/>
                                <line x1="11" y1="3" x2="10" y2="8" stroke="#1e293b" strokeWidth="1.5"/>
                                <line x1="16" y1="3" x2="15" y2="8" stroke="#1e293b" strokeWidth="1.5"/>
                                <polygon points="10,12 10,19 17,15.5" fill="#f59e0b"/>
                            </svg>
                        </div>
                        <div className="flex items-baseline gap-0">
                            <span className="text-lg font-extrabold text-white tracking-tight">Watch</span>
                            <span className="text-lg font-light text-gray-500 tracking-tight">Worth</span>
                        </div>
                    </Link>

                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                        Curated cinema recommendations with honest ratings — no algorithms, no ads, just great films.
                    </p>

                    {/* Social icons */}
                    <div className="flex items-center gap-2">
                        {[
                            {
                                label: 'YouTube',
                                icon: <svg width="14" height="14" fill="#94a3b8" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>,
                            },
                            {
                                label: 'Instagram',
                                icon: <svg width="14" height="14" fill="#94a3b8" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                            },
                            {
                                label: 'Discord',
                                icon: <svg width="14" height="14" fill="#94a3b8" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>,
                            },
                        ].map(({ label, icon }) => (
                            <div
                                key={label}
                                title={label}
                                className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700/60 hover:border-gray-600 hover:bg-gray-700 flex items-center justify-center cursor-pointer transition-all duration-200"
                            >
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Explore column ── */}
                <div>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.12em] mb-4">Explore</p>
                    <div className="flex flex-col gap-2.5">
                        {[
                            { to: '/',         label: 'Home'        },
                            { to: '/movies',   label: 'Movies'      },
                            { to: '/genres',   label: 'Genres'      },
                            { to: '/upcoming', label: 'Coming Soon' },
                            { to: '/watchlist',label: 'Watchlist'   },
                        ].map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className="text-gray-500 hover:text-white text-sm transition-colors duration-200 w-fit"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── Account column ── */}
                <div>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.12em] mb-4">Account</p>
                    <div className="flex flex-col gap-2.5">
                        {[
                            { to: '/login',   label: 'Sign In'     },
                            { to: '/profile', label: 'Profile'     },
                            { to: '/admin',   label: 'Admin Panel' },
                        ].map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className="text-gray-500 hover:text-white text-sm transition-colors duration-200 w-fit"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── Stats column ── */}
                <div>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.12em] mb-4">Collection</p>
                    <div className="flex flex-col gap-3">
                        {[
                            {
                                value: '500+',
                                label: 'Films',
                                color: 'text-blue-400',
                                bg: 'bg-blue-500/10 border-blue-500/20',
                                icon: (
                                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4"/>
                                    </svg>
                                ),
                            },
                            {
                                value: '1,200+',
                                label: 'Reviews',
                                color: 'text-yellow-400',
                                bg: 'bg-yellow-500/10 border-yellow-500/20',
                                icon: (
                                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                ),
                            },
                            {
                                value: '20+',
                                label: 'Genres',
                                color: 'text-purple-400',
                                bg: 'bg-purple-500/10 border-purple-500/20',
                                icon: (
                                    <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                    </svg>
                                ),
                            },
                        ].map(({ value, label, bg, icon }) => (
                            <div key={label} className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${bg}`}>
                                    {icon}
                                </div>
                                <div>
                                    <p className="text-white text-sm font-bold leading-none">{value}</p>
                                    <p className="text-gray-600 text-[11px] mt-0.5">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-800/60 px-6 py-4">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                <p className="text-gray-600 text-xs">
                    © {new Date().getFullYear()} WatchWorth. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

const Layout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Navbar />
            <main key={location.pathname} className="flex-1 p-5 animate-page-in">
                <Outlet />
            </main>
            <Footer />
            <BackToTop />
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
};

export default Layout;