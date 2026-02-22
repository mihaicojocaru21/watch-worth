import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from './paths';
import { Guard } from '../components/Guard';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Movies from '../pages/Movies';
import Unauthorized from '../pages/Unauthorized';
import Forbidden from '../pages/Forbidden';
import ServerError from '../pages/ServerError';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: PATHS.public.home, element: <Home /> },
            { path: PATHS.public.movies, element: <Movies /> },

            {
                element: <Guard publicOnly />,
                children: [
                    { path: PATHS.public.login, element: <Login /> }
                ]
            },

            {
                element: <ProtectedRoute allowedRoles={['admin']} />,
                children: [
                    { path: PATHS.admin.root, element: <Admin /> }
                ]
            },

            { path: PATHS.errors.unauthorized, element: <Unauthorized /> },
            { path: PATHS.errors.forbidden, element: <Forbidden /> },
            { path: PATHS.errors.server, element: <ServerError /> },
        ]
    },
    { path: "*", element: <NotFound /> }
]);