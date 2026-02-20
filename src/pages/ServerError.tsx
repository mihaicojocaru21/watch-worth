import ErrorPage from './ErrorPage';

const ServerError = () => (
    <ErrorPage
        code="500"
        title="Server Error"
        message="Something went wrong. Please try again later."
    />
);

export default ServerError;