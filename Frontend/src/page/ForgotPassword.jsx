import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion'; 
import { KeyRound, ArrowLeft, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Custom Hooks aur Components
import { useAuth } from '../hook/useAuth.js';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AddLayout } from '../components/ui/AuthLayout.jsx';

import resetPasswordSchema from '../schema/auth.reset.password.schema.js' 

export default function ForgotPassword() {
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const { resetPassword } = useAuth();

    // Optimization 1: mode "onTouched" rakha hai taaki har letter par validation na chale
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onTouched", 
    });

    
    const onSubmit = (data) => {

        const payload = {
            email: data.email,
            erpId: data.erpId,
            newPassword: data.password 
        };

        resetPassword.mutate(payload, {
            onSuccess: (response) => {
                toast.success(response.message || "Password updated successfully!");
                setIsSuccess(true);
            },
            onError: (err) => {
                const errorMsg = err.response?.data?.message || "Invalid Email or ERP ID";
                toast.error(errorMsg);
            }
        });
    };

    return (
        <AddLayout 
            title={isSuccess ? "Success!" : "Reset Access"} 
            subtitle={isSuccess ? "Password updated" : "Enter details to recover your account"}
        >
            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.form 
                        key="form"
                        // Optimization 3: Animations ko simple rakha hai taaki GPU par load na pade
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit(onSubmit)} 
                        className="space-y-5"
                    >
                        <Input
                            label="ERP ID"
                            placeholder="KSA123"
                            icon={<ShieldCheck size={18} />}
                            error={errors.erpId?.message}
                            {...register("erpId")}
                            // ERP ID uppercase hone ke liye auto-transform (UI only)
                            onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                        />

                        <Input
                            label="Academy Email"
                            placeholder="name@scienceacademy.com"
                            icon={<Mail size={18} />}
                            error={errors.email?.message}
                            {...register("email")}
                        />

                        <Input
                            label="New Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<KeyRound size={18} />}
                            error={errors.password?.message}
                            {...register("password")}
                        />

                        <Button 
                            type="submit" 
                            loading={resetPassword.isPending} 
                            className="w-full py-4 shadow-lg shadow-violet-600/10"
                        >
                            Update Password <KeyRound size={16} className="ml-2" />
                        </Button>

                        <div className="text-center mt-4">
                            <Link 
                                to="/login" 
                                className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-tighter transition-colors"
                            >
                                <ArrowLeft size={12} /> Back to Login
                            </Link>
                        </div>
                    </motion.form>
                ) : (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-2"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-green-500/10 rounded-full">
                                <CheckCircle2 size={40} className="text-green-500" />
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-6">
                            Security credentials updated. Log in to continue.
                        </p>
                        <Button onClick={() => navigate('/login')} className="w-full">
                            Go to Login
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </AddLayout>
    );
}