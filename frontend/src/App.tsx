import { RouterProvider } from 'react-router-dom';
import { router } from './config/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';

function App() {
    return (
        <AuthProvider>
            <WatchlistProvider>
                <RouterProvider router={router} />
            </WatchlistProvider>
        </AuthProvider>
    );
}

export default App;