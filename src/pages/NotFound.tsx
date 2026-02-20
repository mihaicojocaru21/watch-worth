import ErrorPage from './ErrorPage';

const NotFound = () => (
    <ErrorPage
        code="404"
        title="Not Found"
        message="The page you are looking for does not exist."
    />
);

export default NotFound;