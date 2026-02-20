import ErrorPage from './ErrorPage';

const Unauthorized = () => (
    <ErrorPage
        code="401"
        title="Unauthorized"
        message="Please login to access this area."
    />
);

export default Unauthorized;