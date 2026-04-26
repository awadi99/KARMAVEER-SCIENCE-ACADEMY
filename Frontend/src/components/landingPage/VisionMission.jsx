import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BrainCircuit, HeartHandshake, Sparkles } from 'lucide-react';

export default function VisionMission() {
    // Optimization: Memoizing the gradient styles to prevent re-calculations
    const bgGlows = useMemo(() => (
        <>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-indigo-100/40 dark:from-indigo-900/10 to-transparent pointer-events-none transform-gpu" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-violet-100/50 dark:from-violet-900/10 to-transparent pointer-events-none transform-gpu" />
        </>
    ), []);

    return (
        <section className="py-32 px-6 bg-[#fafafa] dark:bg-[#030303] overflow-hidden relative contain-paint">
            
            {bgGlows}

            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* 1. HEADER SECTION - Optimized for Compositor */}
                <div className="text-left mb-24 max-w-2xl transform-gpu">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm mb-6"
                    >
                        <Sparkles size={14} className="text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 dark:text-slate-400">
                            Our Real Values
                        </span>
                    </motion.div>
                    
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[1] mb-8 italic">
                        Building Good Humans,
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-violet-400 dark:to-fuchsia-400">
                            Not Just Good Marks.
                        </span>
                    </h2>
                    <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        We help students study hard, but we also teach them discipline and respect. Our goal is to make sure every student knows how to behave in society and stays focused on their goals.
                    </p>
                </div>

                {/* 2. GRID LAYOUT - GPU Accelerated Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-stretch">
                    
                    {/* MISSION CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-3 p-10 md:p-14 rounded-[3rem] bg-white dark:bg-[#080808] border border-slate-200/60 dark:border-white/5 shadow-xl dark:shadow-none group relative overflow-hidden transform-gpu"
                    >
                        {/* Static decor instead of heavy blur */}
                        <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-50 dark:bg-indigo-950/20 rounded-full transition-transform duration-500 group-hover:scale-110 transform-gpu" />
                        
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center mb-10 border border-indigo-100 dark:border-indigo-500/20 transform-gpu">
                                <HeartHandshake className="text-indigo-600" size={32} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight italic">Our Mission</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
                                To provide a platform where students learn to be <span className="text-indigo-600 dark:text-indigo-400">honest, hardworking, and disciplined</span>. We prepare them to be responsible adults who help society.
                            </p>
                        </div>
                    </motion.div>

                    {/* VISION CARD - High Contrast Performance */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-2 p-10 rounded-[3rem] bg-slate-900 dark:bg-indigo-600 border border-slate-800 dark:border-white/10 shadow-2xl relative overflow-hidden group transform-gpu"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500 transform-gpu" />

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 transform-gpu">
                                    <BrainCircuit className="text-white" size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-5 uppercase tracking-tight italic">Our Vision</h3>
                                <p className="text-indigo-100 dark:text-indigo-50 leading-relaxed font-bold text-sm">
                                    To see our students <span className="text-white">settled and successful</span> in life. We want them to lead with kindness and make their families proud.
                                </p>
                            </div>
                            
                            <div className="mt-12 flex justify-end">
                                <ShieldCheck size={20} className="text-white/30" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}