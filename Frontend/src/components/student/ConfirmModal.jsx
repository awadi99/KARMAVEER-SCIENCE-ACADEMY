import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, isLoading }) {
    
    // Accessibility: ESC key se modal close karne ke liye
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Portal use karenge taaki modal DOM ke top par render ho (Lag-free)
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-hidden">
                    
                    {/* Overlay: Blurred & Darkened */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[4px] cursor-pointer"
                    />

                    {/* Modal Card: Spring animation for that "Premium" feel */}
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 400 }}
                        className="relative bg-white dark:bg-[#0F172A] w-full max-w-md rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-slate-800 focus:outline-none"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose} 
                            className="absolute right-6 top-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-all"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            {/* Animated Icon Container */}
                            <div className="h-20 w-20 bg-red-50 dark:bg-red-500/10 rounded-3xl flex items-center justify-center text-red-600 mb-6">
                                <AlertTriangle size={40} strokeWidth={2.5} />
                            </div>
                            
                            <div className="space-y-3 mb-8">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                                    {title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-4">
                                    {message}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 w-full">
                                <button 
                                    onClick={onClose}
                                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:brightness-95 active:scale-95 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className="flex-1 px-6 py-4 rounded-2xl bg-red-600 text-white font-bold shadow-lg shadow-red-500/30 hover:bg-red-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        "Confirm"
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}