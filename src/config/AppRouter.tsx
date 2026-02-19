import { createBrowserRouter } from 'react-router-dom';
import { PATHS } from './paths';
import { Guard } from '../components/Guard';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Admin from '../pages/Admin';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: PATHS.public.home, element: <Home /> },

            {
                element: <Guard publicOnly />,
                children: [
                    { path: PATHS.public.login, element: <Login /> }
                ]
            },

            {
                element: <Guard requireAuth />,
                children: [
                    { path: PATHS.admin.root, element: <Admin /> }
                ]
            }
        ]
    },
    { path: "*", element: <div>Pagina nu a fost găsită</div> }
]);