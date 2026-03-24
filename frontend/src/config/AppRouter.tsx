import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from './paths';
import { Guard } from '../components/Guard';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Movies from '../pages/Movies';
import MovieDetail from '../pages/MovieDetail';
import Watchlist from '../pages/Watchlist';
import Upcoming from '../pages/Upcoming';
import Genres from '../pages/Genres';
import Profile from '../pages/Profile';
import Unauthorized from '../pages/Unauthorized';
import Forbidden from '../pages/Forbidden';
import ServerError from '../pages/ServerError';
import NotFound from '../pages/NotFound';
import Items from '../pages/Items';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: PATHS.public.home,        element: <Home /> },
            { path: PATHS.public.movies,      element: <Movies /> },
            { path: PATHS.public.movieDetail, element: <MovieDetail /> },
            { path: PATHS.public.watchlist,   element: <Watchlist /> },
            { path: PATHS.public.upcoming,    element: <Upcoming /> },
            { path: PATHS.public.genres,      element: <Genres /> },
            { path: 'items', element: <Items /> },

            {
                element: <Guard publicOnly />,
                children: [
                    { path: PATHS.public.login, element: <Login /> },
                ],
            },

            {
                element: <ProtectedRoute />,
                children: [
                    { path: PATHS.private.profile, element: <Profile /> },
                ],
            },

            {
                element: <ProtectedRoute allowedRoles={['admin']} />,
                children: [
                    { path: PATHS.admin.root, element: <Admin /> },
                ],
            },

            { path: PATHS.errors.unauthorized, element: <Unauthorized /> },
            { path: PATHS.errors.forbidden,    element: <Forbidden /> },
            { path: PATHS.errors.server,       element: <ServerError /> },
        ],
    },
    { path: '*', element: <NotFound /> },
]);