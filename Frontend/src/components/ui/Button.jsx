import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Button = ({
    children,
    type = "button",
    onClick,
    loading = false,
    disabled = false,
    className = "",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            // 1. transform-gpu makes the scale animation buttery smooth
            // 2. Added font-sans to ensure Poppins is forced here
            className={`
                relative overflow-hidden
                bg-violet-600 hover:bg-violet-500 
                px-6 py-3 rounded-xl 
                text-sm font-black uppercase tracking-widest text-white
                transition-all duration-300 
                active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
                transform-gpu will-change-transform
                shadow-lg shadow-violet-500/20
                ${className}
            `}
        >
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.span
                        key="loader"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                    >
                        {/* A simple CSS spinner looks better than "Loading..." text */}
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Wait...</span>
                    </motion.span>
                ) : (
                    <motion.span
                        key="children"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 flex items-center justify-center gap-2"
                    >
                        {children}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
};

export default Button;