import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS } from '../config/paths';

export function Guard({ requireAuth = false, publicOnly = false }) {
    const { user } = useAuth();
    const location = useLocation();

    if (publicOnly && user) {
        return <Navigate to={PATHS.public.home} replace />;
    }

    if (requireAuth && !user) {
        return <Navigate to={PATHS.public.login} state={{ from: location }} replace />;
    }

    return <Outlet />;
}