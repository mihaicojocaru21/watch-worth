import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './config/AppRouter';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { ReviewProvider } from './context/ReviewContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <WatchlistProvider>
                    <ReviewProvider>
                        <RouterProvider router={router} />
                    </ReviewProvider>
                </WatchlistProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);