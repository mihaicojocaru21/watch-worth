import { Link, useNavigate } from 'react-router-dom';

interface ErrorPageProps {
    code: '401' | '403' | '404' | '500';
    title: string;
    message: string;
}

const config = {
    '401': {
        glow:       'bg-yellow-500/10',
        border:     'border-yellow-500/20',
        iconBg:     'bg-yellow-500/10',
        iconColor:  'text-yellow-400',
        codeColor:  'text-yellow-500/15',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
    },
    '403': {
        glow:       'bg-red-500/10',
        border:     'border-red-500/20',
        iconBg:     'bg-red-500/10',
        iconColor:  'text-red-400',
        codeColor:  'text-red-500/15',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
        ),
    },
    '404': {
        glow:       'bg-blue-500/10',
        border:     'border-blue-500/20',
        iconBg:     'bg-blue-500/10',
        iconColor:  'text-blue-400',
        codeColor:  'text-blue-500/15',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    '500': {
        glow:       'bg-orange-500/10',
        border:     'border-orange-500/20',
        iconBg:     'bg-orange-500/10',
        iconColor:  'text-orange-400',
        codeColor:  'text-orange-500/15',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
    },
};

const ErrorPage = ({ code, title, message }: ErrorPageProps) => {
    const navigate  = useNavigate();
    const { glow, border, iconBg, iconColor, codeColor, icon } = config[code];

    return (
        <div className="min-h-[calc(100vh-128px)] flex items-center justify-center px-6 relative overflow-hidden">

            {/* Background glow blobs */}
            <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${glow} rounded-full blur-3xl pointer-events-none`} />

            <div className="relative text-center max-w-md w-full">

                {/* Big code behind everything */}
                <span className={`absolute inset-0 flex items-center justify-center text-[180px] font-black ${codeColor} select-none pointer-events-none leading-none`}>
                    {code}
                </span>

                {/* Card */}
                <div className={`relative bg-gray-900/80 backdrop-blur border ${border} rounded-2xl px-8 py-10 shadow-2xl`}>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${iconBg} border ${border} flex items-center justify-center mx-auto mb-6 ${iconColor}`}>
                        {icon}
                    </div>

                    {/* Code badge */}
                    <p className={`text-xs font-bold uppercase tracking-widest ${iconColor} mb-3`}>
                        Error {code}
                    </p>

                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
                        {title}
                    </h1>

                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        {message}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm font-semibold transition-all"
                        >
                            Go Back
                        </button>
                        <Link
                            to="/"
                            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
                        >
                            Back to Home
                        </Link>
                        {code === '401' && (
                            <Link
                                to="/login"
                                className="px-5 py-2.5 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-semibold transition-all"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
