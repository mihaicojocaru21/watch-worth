import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="login" element={<Login />} />
                    
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route path="admin" element={<Admin />} />
                    </Route>
                    
                    <Route path="forbidden" element={
                        <ErrorPage
                            code="403"
                            title="Access Forbidden"
                            message="You do not have the required administrative permissions to view this page."
                        />
                    } />
                    
                    <Route path="*" element={
                        <ErrorPage
                            code="404"
                            title="Page Not Found"
                            message="The page you are looking for doesn't exist or has been moved."
                        />
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;