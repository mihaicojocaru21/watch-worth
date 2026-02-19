import { Link } from 'react-router-dom';

interface ErrorPageProps {
    code: '401' | '403' | '404' | '500';
    title: string;
    message: string;
}

const ErrorPage = ({ code, title, message }: ErrorPageProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-9xl font-extrabold text-blue-600 opacity-20 absolute select-none">
            {code}
            </h1>
            <div className="relative">
    <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">{message}</p>
        <Link
    to="/"
    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all"
        >
        Back to Home
    </Link>
    </div>
    </div>
);
};

export default ErrorPage;