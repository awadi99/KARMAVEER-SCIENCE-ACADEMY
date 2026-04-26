import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// UI Components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AddLayout } from '../components/ui/AuthLayout.jsx';

// Schema
import signupSchema from '../schema/auth.schema.js';
import { Link } from 'react-router-dom';

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data) => {
        try {
            // Simulate API latency
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("KSA Registration Success:", data);
        } catch (err) {
            console.error("Enrollment failed", err);
        }
    };

    return (
        <AddLayout
            title="Create Account"
            subtitle="Join Maharashtra's Leading Academy"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 transform-gpu">

                {/* Name & Username Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        error={errors.fullName?.message}
                        {...register("fullName")}
                    />
                    <Input
                        label="ERPID"
                        placeholder="ABCD1"
                        error={errors.erpId?.message}
                        {...register("erpId")}
                    />
                </div>

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="student@scienceacademy.com"
                    error={errors.email?.message}
                    {...register("email")}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register("password")}
                />

                <div className="space-y-4 pt-2">
                    <Button
                        type="submit"
                        loading={isSubmitting}
                        className="w-full py-4 shadow-xl shadow-violet-600/20"
                    >
                        Create Account <ArrowRight size={16} className="ml-2" />
                    </Button>

                    {/* Divider */}
                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-white/5"></div>
                        <span className="flex-shrink mx-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                            Or continue with
                        </span>
                        <div className="flex-grow border-t border-white/5"></div>
                    </div>

                    {/* Google Login Button */}
                    <button
                        type="button"
                        className="group w-full flex items-center justify-center gap-3 px-4 py-3.5 
                        bg-white/5 border border-white/10 rounded-xl transition-all duration-300
                        hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] transform-gpu"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
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

                <div className="flex flex-col items-center gap-4 mt-8">
                    <p className="text-slate-400 text-sm font-medium tracking-tight">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-violet-400 hover:text-violet-300 font-bold transition-all duration-200 hover:underline decoration-violet-400/30 underline-offset-4"
                        >
                            Login
                        </Link>
                    </p>

                    {/* Optional: Subtle separator for the footer status */}
                    <div className="w-12 h-px bg-white/5 mt-2" />

                    {/* Your existing Footer status */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-[8px] text-slate-500 uppercase font-black tracking-[0.3em]">
                            Secure KSA Cloud Enrollment Active
                        </p>
                    </div>
                </div>
            </form>
        </AddLayout>
    );
}