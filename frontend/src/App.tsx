import { RouterProvider } from 'react-router-dom';
import { router } from './config/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { ReviewProvider } from './context/ReviewContext';

function App() {
    return (
        <AuthProvider>
            <WatchlistProvider>
                <ReviewProvider>
                    <RouterProvider router={router} />
                </ReviewProvider>
            </WatchlistProvider>
        </AuthProvider>
    );
}

export default App;