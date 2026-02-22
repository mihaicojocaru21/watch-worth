import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    WatchWorth
                </Link>

                <div className="flex gap-6 items-center">
                    <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                    <Link to="/movies" className="text-gray-300 hover:text-white transition-colors">Movies</Link>
                    
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors">
                            Admin Panel
                        </Link>
                    )}
                    
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-white text-sm">Salut, {user.username}!</span>
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