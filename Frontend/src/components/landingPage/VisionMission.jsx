import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BrainCircuit, HeartHandshake, Sparkles } from 'lucide-react';

export default function VisionMission() {
    // Optimized Glows: Added 'contain-strict' and 'will-change' to prevent layout recalculations
    const bgGlows = useMemo(() => (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" style={{ contain: 'strict' }}>
            <div 
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-emerald-500/10 dark:from-emerald-400/5 to-transparent transform-gpu will-change-transform" 
                style={{ backfaceVisibility: 'hidden' }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-slate-500/10 dark:from-slate-800/10 to-transparent transform-gpu will-change-transform" 
                style={{ backfaceVisibility: 'hidden' }}
            />
        </div>
    ), []);

    return (
        <section 
            id="vision-mission"
            className="py-32 px-6 bg-[#F8FAFA] dark:bg-[#0F172A] overflow-hidden relative transition-colors duration-500 isolate"
            /* 1. contain: content -> Prevents this section from affecting the layout of the rest of the page.
               2. content-visibility: auto -> Skips rendering this section entirely when it's off-screen.
            */
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
                        transition={{ duration: 0.3, ease: "easeOut" }} // Optimized duration
                        viewport={{ once: true, margin: "-50px" }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-500/20 shadow-sm mb-6 transform-gpu"
                    >
                        <Sparkles size={14} className="text-emerald-500 dark:text-emerald-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 dark:text-emerald-200/60">
                            Our Real Values
                        </span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[1.1] mb-8 transform-gpu">
                        Building Good Humans,
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 dark:from-emerald-400 dark:via-emerald-300 dark:to-emerald-400">
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
                        className="md:col-span-3 p-10 md:p-14 rounded-[2rem] bg-white dark:bg-[#1E293B] border border-slate-200/60 dark:border-white/5 shadow-xl dark:shadow-none group relative overflow-hidden transform-gpu will-change-transform isolate"
                    >
                        <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-50 dark:bg-emerald-900/10 rounded-full transition-transform duration-500 group-hover:scale-110 transform-gpu" style={{ backfaceVisibility: 'hidden' }} />
                        
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl flex items-center justify-center mb-10 border border-emerald-100 dark:border-emerald-500/20 transform-gpu">
                                <HeartHandshake className="text-emerald-600 dark:text-emerald-400" size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Our Mission</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                                To provide a platform where students learn to be <span className="text-emerald-600 dark:text-emerald-400 font-bold">honest, hardworking, and disciplined</span>. We prepare them to be responsible adults who help society.
                            </p>
                        </div>
                    </motion.div>

                    {/* VISION CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="md:col-span-2 p-10 rounded-[2rem] bg-slate-900 dark:bg-[#020617] border border-slate-800 dark:border-emerald-500/30 shadow-2xl relative overflow-hidden group transform-gpu will-change-transform isolate"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500 transform-gpu" style={{ backfaceVisibility: 'hidden' }} />

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-8 border border-emerald-500/20 transform-gpu">
                                    <BrainCircuit className="text-emerald-400" size={28} />
                                </div>
                                <h3 className="text-xl font-black text-white mb-5 uppercase tracking-tight">Our Vision</h3>
                                <p className="text-slate-300 dark:text-slate-400 leading-relaxed font-semibold text-sm">
                                    To see our students <span className="text-emerald-400 underline decoration-emerald-400/30 underline-offset-4">settled and successful</span> in life. We want them to lead with kindness and make their families proud.
                                </p>
                            </div>
                            
                            <div className="mt-12 flex justify-end">
                                <ShieldCheck size={20} className="text-emerald-500/40" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}