import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PATHS } from '../config/paths';

interface ProtectedRouteProps {
    allowedRoles?: ('admin' | 'user')[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={PATHS.errors.unauthorized} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role as 'admin' | 'user')) {
        return <Navigate to={PATHS.errors.forbidden} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;