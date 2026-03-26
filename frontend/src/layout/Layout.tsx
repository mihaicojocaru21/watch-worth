import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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

const Layout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Navbar />
            <main key={location.pathname} className="flex-1 p-5 animate-page-in">
                <Outlet />
            </main>
            <footer className="p-4 bg-black text-gray-400 text-center text-sm">
                &copy; {new Date().getFullYear()} WatchWorth. All rights reserved.
            </footer>

            <BackToTop />
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
};

export default Layout;