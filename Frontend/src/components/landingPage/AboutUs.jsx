import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Sparkles } from 'lucide-react';
import { hero_bg } from '../../assets/website/index.js';

export default function AboutUs() {
    return (
        <section 
            id="about" 
            className="py-32 px-6 bg-white dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-500 isolate"
            style={{ contain: 'content', contentVisibility: 'auto' }}
        >

            {/* BACKGROUND GLOWS: Tuned colors to clear educational corporate blue/slate tints */}
            <div 
                className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-500/5 dark:from-blue-400/5 to-transparent pointer-events-none transform-gpu opacity-50" 
                style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
            />
            <div 
                className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-slate-200/40 dark:from-slate-800/20 to-transparent pointer-events-none transform-gpu opacity-50" 
                style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
            />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* SECTION TITLE */}
                <div className="mb-20 transform-gpu">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex flex-col items-start gap-2 transform-gpu"
                    >
                        {/* Pill Badge: Replaced bright amber with clean Academic Slate/Blue layout */}
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Who We Are</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                            <span className="text-[#2563EB] dark:text-[#3B82F6]">About</span> us
                        </h2>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-20 items-center">

                    {/* LEFT: THE VISUAL STACK */}
                    <div className="w-full lg:w-1/2 relative transform-gpu">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative z-10 rounded-[3rem] overflow-hidden border-[12px] border-slate-50 dark:border-[#1E293B] shadow-2xl shadow-blue-900/5 isolate transform-gpu"
                        >
                            <img
                                src={hero_bg}
                                alt="KSA Journey"
                                loading="lazy"
                                className="w-full h-[550px] object-cover transition-transform duration-700 ease-out hover:scale-105 transform-gpu will-change-transform"
                            />
                        </motion.div>

                        {/* OVERLAPPING STAT CARD: Colored elements to reliable institution styling */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-8 -right-4 md:right-8 z-20 p-8 rounded-[2.5rem] bg-white/95 dark:bg-[#1E293B]/95 border border-slate-200 dark:border-slate-800 shadow-xl transform-gpu isolate"
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <p className="text-4xl font-black text-[#2563EB] dark:text-[#3B82F6]">10+</p>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">Years</p>
                                </div>
                                <div className="w-[1px] h-12 bg-slate-200 dark:bg-slate-700" />
                                <div className="text-center">
                                    <p className="text-4xl font-black text-[#2563EB] dark:text-[#3B82F6]">500+</p>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">Success</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: THE CONTENT */}
                    <div className="w-full lg:w-1/2 space-y-8 transform-gpu">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: true }}
                            className="transform-gpu"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/20 mb-6">
                                <Sparkles size={14} className="text-[#2563EB] dark:text-[#3B82F6]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2563EB] dark:text-blue-400">Our Heritage</span>
                            </div>

                            {/* Heading: Removed yellow gaming text, switched to sharp academic Navy/Blue tones */}
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.95] mb-6">
                                Built for <br />
                                <span className="text-[#2563EB] dark:text-[#3B82F6]">
                                    Better Lives.
                                </span>
                            </h2>

                            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-l-4 border-blue-600 pl-6 mb-8 transform-gpu">
                                Academic excellence is our foundation, but character is our goal. We instill the discipline and respect required for students to become focused, responsible leaders.
                            </p>
                        </motion.div>

                        {/* PHILOSOPHY BOXES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 transform-gpu">
                            {/* Discipline Box */}
                            <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-[#1E293B] border border-slate-200/60 dark:border-slate-800 transition-transform duration-300 hover:-translate-y-1 transform-gpu">
                                <Shield className="text-[#2563EB] dark:text-[#3B82F6] mb-4" size={24} />
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 uppercase tracking-tight">Discipline</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-bold">Focus on behavior for life-long results.</p>
                            </div>

                            {/* Ethics Box: Turned gaming amber into an elegant Trust Blue Academic block */}
                            <div className="p-6 rounded-[2rem] bg-[#2563EB] dark:bg-[#1D4ED8] shadow-lg shadow-blue-900/10 transition-transform duration-300 hover:-translate-y-1 transform-gpu">
                                <Heart className="text-white mb-4" size={24} />
                                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Ethics</h4>
                                <p className="text-xs text-blue-50/90 leading-relaxed font-bold">Hard-earned marks with social respect.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}