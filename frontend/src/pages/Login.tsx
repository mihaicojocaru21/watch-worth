import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const FEATURED = [
    { title: 'The Shawshank Redemption', year: 1994, rating: 9.3 },
    { title: 'The Godfather',             year: 1972, rating: 9.2 },
    { title: 'The Dark Knight',           year: 2008, rating: 9.0 },
    { title: 'Pulp Fiction',              year: 1994, rating: 8.9 },
    { title: 'Inception',                 year: 2010, rating: 8.8 },
    { title: 'Interstellar',              year: 2014, rating: 8.6 },
];

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPass, setShowPass] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

    const onSubmit = async (data: LoginFormData) => {
        const success = await login(data.email, data.password);
        if (success) {
            toast.success('Welcome back!');
            navigate('/');
        } else {
            toast.error('Invalid email or password.');
        }
    };

    return (
        <div className="min-h-[calc(100vh-128px)] flex">

            {/* ── Left panel — decorative ── */}
            <div className="hidden lg:flex flex-col justify-between w-[45%] bg-gray-950 border-r border-gray-800 p-12 relative overflow-hidden">

                {/* Background glow */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

                {/* Brand */}
                <div>
                    <Link to="/" className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
                        WatchWorth
                    </Link>
                    <p className="text-gray-500 mt-2 text-sm">Curated cinema, zero noise.</p>
                </div>

                {/* Film strip cards */}
                <div className="space-y-3">
                    <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold mb-5">Top rated right now</p>
                    {FEATURED.map((film, i) => (
                        <div
                            key={film.title}
                            className="flex items-center gap-4 p-3 rounded-xl bg-gray-900/60 border border-gray-800/60 backdrop-blur-sm"
                            style={{ opacity: 1 - i * 0.12 }}
                        >
                            <span className="text-xs text-gray-600 font-mono w-4 shrink-0">{i + 1}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-semibold truncate">{film.title}</p>
                                <p className="text-gray-500 text-xs">{film.year}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <span className="text-yellow-400 text-xs">★</span>
                                <span className="text-yellow-400 text-xs font-bold">{film.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 border-blue-500/40 pl-4">
                    <p className="text-gray-500 text-sm italic leading-relaxed">
                        "Cinema is a mirror by which we often see ourselves."
                    </p>
                    <cite className="text-gray-600 text-xs mt-1 block not-italic">— Martin Scorsese</cite>
                </blockquote>
            </div>

            {/* ── Right panel — form ── */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-900">
                <div className="w-full max-w-sm">

                    {/* Header */}
                    <div className="mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome back</h1>
                        <p className="text-gray-500 mt-1.5 text-sm">Sign in to your WatchWorth account</p>
                    </div>

                    {/* Demo credentials hint */}
                    <div className="mb-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 text-xs text-gray-400 space-y-1">
                        <p className="font-semibold text-blue-400 mb-2 uppercase tracking-widest text-[10px]">Demo accounts</p>
                        <p><span className="text-gray-300">Admin:</span> admin@watchworth.com · admin123</p>
                        <p><span className="text-gray-300">User:</span> user@watchworth.com · user123</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-500 pointer-events-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </span>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 transition-all ${
                                        errors.email
                                            ? 'border-red-500/60 focus:ring-red-500/20'
                                            : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
                                    }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                    <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-500 pointer-events-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    {...register('password')}
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    className={`w-full pl-10 pr-11 py-3 rounded-xl bg-gray-800 border text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 transition-all ${
                                        errors.password
                                            ? 'border-red-500/60 focus:ring-red-500/20'
                                            : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(p => !p)}
                                    className="absolute inset-y-0 right-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPass ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                    <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 mt-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                    </svg>
                                    Signing in…
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Links */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                            Sign up
                        </Link>
                    </p>
                    <p className="mt-3 text-center text-sm text-gray-600">
                        Just browsing?{' '}
                        <Link to="/movies" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                            Explore movies
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
