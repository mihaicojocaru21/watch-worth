import ErrorPage from './ErrorPage';

const Forbidden = () => (
    <ErrorPage
        code="403"
        title="Forbidden"
        message="You do not have permission to access this area."
    />
);

export default Forbidden;