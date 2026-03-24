import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './config/AppRouter';
import { AxiosProvider } from './providers/AxiosProvider';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { ThemeProvider } from './context/ThemeContext'; // ajustează path-ul dacă e altul

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AxiosProvider>
            <ThemeProvider>
                <AuthProvider>
                    <WatchlistProvider>
                        <RouterProvider router={router} />
                    </WatchlistProvider>
                </AuthProvider>
            </ThemeProvider>
        </AxiosProvider>
    </React.StrictMode>
);