import { RouterProvider } from 'react-router-dom';
import { router } from './config/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { ReviewProvider } from './context/ReviewContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <WatchlistProvider>
                    <ReviewProvider>
                        <RouterProvider router={router} />
                    </ReviewProvider>
                </WatchlistProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;