import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BrainCircuit, HeartHandshake, Sparkles } from 'lucide-react';

export default function VisionMission() {
    // Optimized Glows: Changed gaming neon colors to safe, corporate/academic tints
    const bgGlows = useMemo(() => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" style={{ contain: 'strict' }}>
            <div 
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-500/5 dark:from-blue-400/5 to-transparent transform-gpu will-change-transform" 
                style={{ backfaceVisibility: 'hidden' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-slate-200/40 dark:from-slate-800/20 to-transparent transform-gpu will-change-transform" 
                style={{ backfaceVisibility: 'hidden' }}
            />
        </div>
    ), []);

    return (
        <section 
            id="vision-mission"
            className="py-32 px-6 bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden relative transition-colors duration-500 isolate"
            style={{ 
                contain: 'content', 
                contentVisibility: 'auto',
                WebkitFontSmoothing: 'antialiased'
            }}
        >
            {bgGlows}

            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* 1. HEADER SECTION */}
                <div className="text-left mb-20 max-w-2xl transform-gpu">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mb-6 transform-gpu"
                    >
                        <Sparkles size={14} className="text-[#2563EB] dark:text-[#3B82F6]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                            Our Core Values
                        </span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[1.1] mb-8 transform-gpu">
                        Building Good Humans,
                        <br />
                        <span className="text-[#2563EB] dark:text-[#3B82F6]">
                            Not Just Good Marks.
                        </span>
                    </h2>
                    <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed transform-gpu">
                        Academic success is just the starting point. We focus on developing the character, discipline, and respect needed for students to thrive as leaders in the modern world.
                    </p>
                </div>

                {/* 2. GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-stretch transform-gpu">
                    
                    {/* MISSION CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="md:col-span-3 p-10 md:p-14 rounded-[2rem] bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none group relative overflow-hidden transform-gpu will-change-transform isolate"
                    >
                        {/* Soft Academic Accent background circle */}
                        <div className="absolute -top-16 -right-16 w-48 h-48 bg-slate-50 dark:bg-slate-800/40 rounded-full transition-transform duration-500 group-hover:scale-110 transform-gpu" style={{ backfaceVisibility: 'hidden' }} />
                        
                        <div className="relative z-10">
                            {/* Icon Wrapper: Changed to standard EdTech Blue styling */}
                            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex items-center justify-center mb-10 transform-gpu">
                                <HeartHandshake className="text-[#2563EB] dark:text-[#3B82F6]" size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Our Mission</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                                To provide a platform where students learn to be <span className="text-[#2563EB] dark:text-[#3B82F6] font-bold">honest, hardworking, and disciplined</span>. We prepare them to be responsible adults who help society.
                            </p>
                        </div>
                    </motion.div>

                    {/* VISION CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="md:col-span-2 p-10 rounded-[2rem] bg-slate-900 dark:bg-[#020617] border border-slate-800 dark:border-slate-800 shadow-md relative overflow-hidden group transform-gpu will-change-transform isolate"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500 transform-gpu" style={{ backfaceVisibility: 'hidden' }} />

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                {/* Icon Wrapper: Adjusted for contrast on Dark/Premium Card */}
                                <div className="w-14 h-14 bg-white/10 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-8 border border-white/10 dark:border-slate-700 transform-gpu">
                                    <BrainCircuit className="text-white dark:text-blue-400" size={28} />
                                </div>
                                <h3 className="text-xl font-black text-white mb-5 uppercase tracking-tight">Our Vision</h3>
                                <p className="text-slate-300 dark:text-slate-400 leading-relaxed font-semibold text-sm">
                                    To see our students <span className="text-blue-400 underline decoration-blue-400/30 underline-offset-4 font-bold">settled and successful</span> in life. We want them to lead with kindness and make their families proud.
                                </p>
                            </div>
                            
                            <div className="mt-12 flex justify-end">
                                <ShieldCheck size={20} className="text-blue-500/30 dark:text-blue-500/20" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}