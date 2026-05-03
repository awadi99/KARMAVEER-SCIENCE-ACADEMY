import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth.js';

// UI Components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AddLayout } from '../components/ui/AuthLayout.jsx';


import loginSchema from '../schema/auth.login.schema.js';

export default function Login() {

    const navigate = useNavigate();
    const { loginUser } = useAuth();


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        // Using your existing schema here
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
    });



    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
    };


    const onSubmit = (data) => {
        loginUser.mutate(data, {
            onSuccess: (res) => {
                toast.success(res.message || "Welcome back!");
                const user = res.user || res; // Backend response structure ke hisaab se

            if (user.role === 'admin') {
                navigate('/dashboard');
            } else if (user.standard && user.stream) {
                navigate('/dashboard');
            } else {
                navigate('/dashboard/profile');
            }
                
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Invalid email or password");
            }
        });
    };




    return (
        <AddLayout
            title="Welcome Back"
            subtitle="Access your KSA Learning Dashboard"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 transform-gpu">

                {/* Email Field - Uses your regex validation */}
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="student@scienceacademy.com"
                    error={errors.email?.message}
                    {...register("email")}
                />

                {/* Password Field - Uses your strength regex */}
                <div className="space-y-1">
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register("password")}
                    />
                    <div className="flex justify-end px-1">
                        <Link
                            to="/forgot-password"
                            className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-violet-400 transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    <Button
                        type="submit"
                        loading={isSubmitting}
                        className="w-full py-4 shadow-xl shadow-violet-600/20"
                    >
                        {loginUser.isPending ? "Loading..." : "Sign In"}  <LogIn size={16} className="ml-2" />
                    </Button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-white/5"></div>
                        <span className="flex-shrink mx-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Or connect via
                        </span>
                        <div className="flex-grow border-t border-white/5"></div>
                    </div>

                    {/* Google Login Button */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="group w-full flex items-center justify-center gap-3 px-4 py-3.5 
                        bg-white/5 border border-white/10 rounded-xl transition-all duration-300
                        hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] transform-gpu"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">
                            Google Account
                        </span>
                    </button>
                </div>

                {/* Redirect back to Register */}
                <div className="text-center mt-6">
                    <p className="text-slate-400 text-xs font-medium">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-violet-400 hover:text-violet-300 font-bold transition-all duration-200 underline-offset-4 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </AddLayout>
    );
}