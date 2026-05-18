import React from 'react';

export const AddLayout = ({ children, title, subtitle }) => {
    return (
        /* Replaced hardcoded violet tint with smart adaptive background layer for perfect themes shifting */
        <section className="min-h-screen flex items-center justify-center bg-blue-500/5 dark:bg-slate-950/20 text-slate-900 dark:text-white px-4 relative overflow-hidden transition-colors duration-500">
            
            {/* Soft Academic Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-500/5 blur-[130px] rounded-full pointer-events-none" />

            {/* Central Box Layered Wrapper: Switched from static dark black to reactive dynamic background cards */}
            <div className="w-full max-w-[500px] p-8 md:p-12 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] relative z-10 shadow-xl dark:shadow-none transition-all duration-500">
                {/* Header Area */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-3">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Content Area */}
                <div className="w-full">
                    {children}
                </div>
            </div>
        </section>
    );
};