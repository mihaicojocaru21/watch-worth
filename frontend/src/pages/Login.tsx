import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        const success = await login(data.email);

        if (success) {
            toast.success("Login successful!");
            navigate('/');
        } else {
            toast.error("User not found! Try: admin@test.com");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 outline-none"
                        placeholder="admin@test.com"
                    />
                    {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Password</label>
                    <input
                        {...register("password")}
                        type="password"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 outline-none"
                        placeholder="******"
                    />
                    {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold rounded transition-colors"
                >
                    {isSubmitting ? "Verifying..." : "Sign In"}
                </button>
            </form>
        </div>
    );
};

export default Login;