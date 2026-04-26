import React from 'react';

export const AddLayout = ({ children, title, subtitle }) => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-violet-500/10 text-white px-4 relative overflow-hidden">
            
            {/* Soft Glow Background for that 'Cloud' feel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[500px] p-8 md:p-12 bg-[#080808] border border-white/5 rounded-[2.5rem] relative z-10 shadow-2xl">
                {/* Header Area */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black  tracking-tighter ">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-3">
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