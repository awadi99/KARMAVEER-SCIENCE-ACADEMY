import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AddLayout } from '../components/ui/AuthLayout.jsx';

// Simple schema for email validation
const forgotSchema = z.object({
    email: z.string().email("Please enter a valid academy email"),
});

export default function ForgotPassword() {
    const [isSent, setIsSent] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(forgotSchema),
    });

    const onSubmit = async (data) => {
        try {
            // API Call to trigger reset email
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Reset link sent to:", data.email);
            setIsSent(true);
        } catch (err) {
            console.error("Reset failed", err);
        }
    };

    return (
        <AddLayout 
            title={isSent ? "Check Email" : "Reset Password"} 
            subtitle={isSent ? "We sent a link to your inbox" : "Enter your email to recover your account"}
        >
            <AnimatePresence mode="wait">
                {!isSent ? (
                    <motion.form 
                        key="form"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        onSubmit={handleSubmit(onSubmit)} 
                        className="space-y-6"
                    >
                        <Input
                            label="Registered Email"
                            type="email"
                            placeholder="student@scienceacademy.com"
                            error={errors.email?.message}
                            {...register("email")}
                        />

                        <Button 
                            type="submit" 
                            loading={isSubmitting}
                            className="w-full py-4 shadow-xl shadow-violet-600/20"
                        >
                            Send Reset Link <Mail size={16} className="ml-2" />
                        </Button>

                        <div className="text-center mt-6">
                            <Link 
                                to="/login" 
                                className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                            >
                                <ArrowLeft size={14} /> Back to Login
                            </Link>
                        </div>
                    </motion.form>
                ) : (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-4"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-green-500/10 rounded-full">
                                <CheckCircle2 size={48} className="text-green-500" />
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                            If an account exists for that email, you will receive a password reset link shortly.
                        </p>
                        <Link to="/login">
                            <Button className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10">
                                Return to Login
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </AddLayout>
    );
}