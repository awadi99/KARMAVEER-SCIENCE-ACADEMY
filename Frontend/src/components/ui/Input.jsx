import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Input = forwardRef(({
    label,
    type = "text",
    name,
    placeholder,
    error,
    disabled = false,
    className = "",
    ...props
}, ref) => {
    return (
        <div className="flex flex-col gap-2 w-full group transform-gpu">
            {label && (
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-1">
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    ref={ref}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    // Optimized for Poppins & Dark Mode
                    className={`
                        w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-300
                        bg-white dark:bg-white/[0.03]
                        text-slate-900 dark:text-white
                        placeholder:text-slate-400 dark:placeholder:text-slate-600
                        ${error 
                            ? "border-red-500 ring-4 ring-red-500/10" 
                            : "border-slate-200 dark:border-white/10 focus:border-indigo-500 dark:focus:border-violet-500 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-violet-500/10"
                        } 
                        ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-white/5" : "hover:border-slate-300 dark:hover:border-white/20"} 
                        ${className}
                    `}
                    {...props}
                />
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
});

Input.displayName = "Input"; // Good practice for debugging forwardRef

export default Input;