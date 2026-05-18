import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, User, ShieldCheck, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth.js';
import { toast } from 'react-toastify';

// UI Components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AddLayout } from '../components/ui/AuthLayout.jsx';

// Schema
import signupSchema from '../schema/auth.schema.js';

export default function Register() {
    const navigate = useNavigate();
    const { registerUser, verifyErp } = useAuth(); 
    const [isVerified, setIsVerified] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: "onChange",
        defaultValues: {
            role: "student",
            erpId: ""
        }
    });

    const watchedRole = watch("role");
    const watchedErpId = watch("erpId");

    // Logic for Verification Button
    const canVerify = watchedErpId?.length >= 3 && !errors.erpId && !isVerified;

    const handleVerifyERP = () => {
        if (!canVerify) return;
        
        verifyErp.mutate({ erpId: watchedErpId, role: watchedRole }, {
            onSuccess: () => {
                setIsVerified(true);
                toast.success("ERP Verified Successfully!");
            },
            onError: (err) => {
                setIsVerified(false);
                toast.error(err.response?.data?.message || "Invalid ERP or Role");
            }
        });
    };

    const handleGoogleAuth = () => {
        if (!isVerified) {
            toast.error("Please verify your ERP ID first");
            return;
        }
        const backendBase = import.meta.env.VITE_API_BASE_URL;
        window.location.href = `${backendBase}/auth/google?role=${watchedRole}&erpId=${watchedErpId}`;
    };

    const onSubmit = (data) => {
        if (!isVerified) {
            toast.error("Verify your identity before creating account");
            return;
        }
        registerUser.mutate(data, {
            onSuccess: () => {
                toast.success("Account created successfully! Please login.");
                navigate('/login');
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Registration Failed");
            }
        });
    };

    return (
        <AddLayout title="Create Account" subtitle="Join Maharashtra's Leading Academy">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 transform-gpu text-slate-900 dark:text-white">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        error={errors.fullName?.message}
                        {...register("fullName")}
                        className="bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800"
                    />
                    <div className="relative">
                        <Input
                            label="ERPID"
                            placeholder="ABCD1"
                            disabled={isVerified}
                            error={errors.erpId?.message}
                            {...register("erpId")}
                            className="bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800"
                        />
                        {isVerified && (
                            <CheckCircle2 size={16} className="absolute right-3 top-[38px] text-emerald-600 dark:text-emerald-500" />
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">
                        Select Identity
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="relative cursor-pointer group">
                            <input type="radio" value="student" disabled={isVerified} {...register("role")} className="peer hidden" />
                            <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 transition-all duration-300 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950/30 peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/[0.04] peer-disabled:opacity-50">
                                <User size={14} />
                                <span className="text-xs font-black uppercase tracking-widest">Student</span>
                            </div>
                        </label>
                        <label className="relative cursor-pointer group">
                            <input type="radio" value="admin" disabled={isVerified} {...register("role")} className="peer hidden" />
                            <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 transition-all duration-300 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950/30 peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/[0.04] peer-disabled:opacity-50">
                                <ShieldCheck size={14} />
                                <span className="text-xs font-black uppercase tracking-widest">Admin</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* VERIFY BUTTON */}
                {!isVerified ? (
                    <Button 
                        type="button" 
                        onClick={handleVerifyERP}
                        disabled={!canVerify || verifyErp.isPending}
                        className={`w-full py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-500 border
                        ${canVerify 
                            ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20" 
                            : "bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"}`}
                    >
                        {verifyErp.isPending ? (
                            <Loader2 size={14} className="animate-spin mr-2" />
                        ) : <ShieldCheck size={14} className="mr-2" />}
                        Verify Identity to Proceed
                    </Button>
                ) : (
                    <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                         <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Identity Confirmed</span>
                         <button 
                            type="button" 
                            onClick={() => setIsVerified(false)}
                            className="ml-auto text-[9px] font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider"
                         >
                            Edit
                         </button>
                    </div>
                )}

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="student@scienceacademy.com"
                    error={errors.email?.message}
                    {...register("email")}
                    className="bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800"
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register("password")}
                    className="bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800"
                />

                <div className="space-y-4 pt-2">
                    <Button 
                        type="submit" 
                        disabled={registerUser.isPending || !isVerified} 
                        className={`w-full py-4 text-xs font-black uppercase tracking-wider transition-all duration-500 ${
                            isVerified 
                                ? 'bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white shadow-md shadow-blue-600/10' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50 grayscale'
                        }`}
                    >
                        {registerUser.isPending ? "Loading..." : "Create Account"} <ArrowRight size={16} className="ml-2" />
                    </Button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                        <span className="flex-shrink mx-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                            Or continue with
                        </span>
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleAuth}
                        disabled={!isVerified}
                        className={`group w-full flex items-center justify-center gap-3 px-4 py-3.5 
                        border rounded-xl transition-all duration-300 transform-gpu
                        ${isVerified 
                            ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98]" 
                            : "bg-slate-100/[0.4] dark:bg-slate-900/[0.2] border-slate-200 dark:border-slate-900/50 text-slate-400 dark:text-slate-600 cursor-not-allowed"}`}
                    >
                        {isVerified ? (
                           <svg className="w-5 h-5" viewBox="0 0 24 24">
                           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                       </svg>
                        ) : <Lock size={16} className="text-slate-400 dark:text-slate-600" />}
                        
                        <span className={`text-xs font-black uppercase tracking-widest ${isVerified ? 'text-slate-800 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                            {isVerified ? `Google (${watchedRole})` : "Verify ERP to Unlock"}
                        </span>
                    </button>
                </div>

                <div className="flex flex-col items-center gap-4 mt-8">
                    <p className="text-slate-500 dark:text-slate-500 text-sm font-medium tracking-tight">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold hover:underline decoration-blue-500/30 underline-offset-4 transition-colors">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </AddLayout>
    );
}