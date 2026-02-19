import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorPage from '../pages/ErrorPage';

interface ProtectedRouteProps {
    allowedRoles?: ('admin' | 'user')[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user } = useAuth();
    
    if (!user) {
        return <ErrorPage code="401" title="Unauthorized" message="Please login to access this area." />;
    }
    
    if (allowedRoles && !allowedRoles.includes(user.role as 'admin' | 'user')) {
        return <Navigate to="/forbidden" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;