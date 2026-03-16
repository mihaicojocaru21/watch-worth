import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Navbar />
            <main className="flex-1 p-5">
                <Outlet />
            </main>
            <footer className="p-4 bg-black text-gray-400 text-center">
                &copy; {new Date().getFullYear()} WatchWorth. All rights reserved.
            </footer>

            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
};

export default Layout;