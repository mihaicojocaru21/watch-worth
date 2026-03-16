import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS } from '../config/paths';

interface ProtectedRouteProps {
    allowedRoles?: ('admin' | 'user')[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to={PATHS.public.login} state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role as 'admin' | 'user')) {
        return <Navigate to={PATHS.errors.forbidden} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;