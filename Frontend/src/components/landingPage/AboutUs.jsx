import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Sparkles } from 'lucide-react';

export default function AboutUs() {
    return (
        <section id="about" className="py-32 px-6 bg-white dark:bg-[#020105] relative overflow-hidden transition-colors duration-500 contain-paint">

            {/* OPTIMIZED BG: Radial gradients are 10x lighter on GPU than blur filters */}
            <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-600/5 dark:from-purple-500/10 to-transparent pointer-events-none transform-gpu" />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-indigo-600/5 dark:from-purple-900/10 to-transparent pointer-events-none transform-gpu" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* SECTION TITLE */}
                <div className="mb-20 transform-gpu">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex flex-col items-start gap-2"
                    >
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400">Who We Are</span>
                        </div>
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                            <span className="text-purple-600">About</span> us
                        </h2>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-20 items-center">

                    {/* LEFT: THE VISUAL STACK - GPU Accelerated */}
                    <div className="w-full lg:w-1/2 relative will-change-transform transform-gpu">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative z-10 rounded-[4rem] overflow-hidden border-[12px] border-slate-50 dark:border-purple-900/20 shadow-2xl shadow-purple-500/10 contain-layout"
                        >
                            <img
                                src="/image/hero_bg.jpg"
                                alt="KSA Journey"
                                className="w-full h-[550px] object-cover transition-transform duration-700 ease-out hover:scale-105 transform-gpu"
                            />
                        </motion.div>

                        {/* OVERLAPPING STAT CARD - Static Blur for Performance */}
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-8 -right-4 md:right-8 z-20 p-8 rounded-[3rem] bg-white/90 dark:bg-[#0c051a]/90 border border-white dark:border-purple-500/30 shadow-2xl transform-gpu"
                        >
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <p className="text-4xl font-black text-slate-900 dark:text-purple-400">10+</p>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-purple-300/60">Years</p>
                                </div>
                                <div className="w-[1px] h-12 bg-slate-200 dark:bg-purple-500/20" />
                                <div className="text-center">
                                    <p className="text-4xl font-black text-slate-900 dark:text-purple-400">500+</p>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-purple-300/60">Success</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: THE CONTENT */}
                    <div className="w-full lg:w-1/2 space-y-8 transform-gpu">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 mb-6">
                                <Sparkles size={14} className="text-purple-600" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400">Since Day One</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.95] mb-6">
                                Built for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                                    Better Lives.
                                </span>
                            </h2>

                            <p className="text-lg text-slate-600 dark:text-purple-100/60 font-medium leading-relaxed italic border-l-4 border-purple-500 pl-6 mb-8">
                                "Our mission is simple: To build a platform where any student can learn how to be settled, disciplined, and responsible."
                            </p>
                        </motion.div>

                        {/* PHILOSOPHY BOXES - Using pure CSS transitions for max FPS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-[2.5rem] bg-slate-50 dark:bg-purple-900/10 border border-slate-100 dark:border-purple-500/20 transition-transform duration-300 hover:-translate-y-1 transform-gpu">
                                <Shield className="text-purple-600 mb-4" size={24} />
                                <h4 className="text-lg font-bold dark:text-white mb-1 uppercase tracking-tight">Discipline</h4>
                                <p className="text-xs text-slate-500 dark:text-purple-200/50 leading-relaxed font-bold">Focus on behavior for life-long results.</p>
                            </div>

                            <div className="p-6 rounded-[2.5rem] bg-purple-600 shadow-xl shadow-purple-500/20 transition-transform duration-300 hover:-translate-y-1 transform-gpu">
                                <Heart className="text-white mb-4" size={24} />
                                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Ethics</h4>
                                <p className="text-xs text-purple-50/80 leading-relaxed font-bold">Hard-earned marks with social respect.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}