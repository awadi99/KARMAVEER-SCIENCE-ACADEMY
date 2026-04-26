import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroBackground from "./HeroBackground"; 
import HeroWaves from "./HeroWaves";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();
    const buttonClass = "px-8 py-4 font-black uppercase tracking-widest text-[10px] md:text-xs rounded-2xl transition-all transform-gpu active:scale-95";
    
    return (
        <section 
            id="hero" 
            className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-10 bg-white dark:bg-black transition-colors duration-500 contain-layout"
        >
            {/* Background elements moved to their own compositor layers */}
            <div className="absolute inset-0 pointer-events-none transform-gpu">
                <HeroBackground />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center will-change-transform transform-gpu">
                
                {/* 1. Admissions Badge - Simplified Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-violet-500/20 bg-slate-50/50 dark:bg-violet-500/5 backdrop-blur-sm mb-8 transform-gpu"
                >
                    <Sparkles size={14} className="text-indigo-600 dark:text-violet-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-violet-300">
                        Admissions Open 
                    </span>
                </motion.div>

                {/* 2. Main Heading - tracking-tighter can be expensive; optimized with GPU */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-5xl md:text-[7rem] font-black tracking-tighter leading-[0.85] mb-8 transform-gpu"
                >
                    <span className="text-slate-900 dark:text-white">WELCOME TO</span>
                    <br />
                    <span className=" bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent italic pb-2 inline-block">
                        KARMAVEER <br className="md:hidden" /> SCIENCE ACADEMY
                    </span>
                </motion.h1>

                {/* 3. Description - Removed opacity animation delay for better LCP */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="max-w-2xl mx-auto text-sm md:text-lg text-slate-600 dark:text-slate-400 font-bold uppercase tracking-tight leading-relaxed mb-10"
                >
                    Maharashtra’s trusted coaching for 11th & 12th Science. <br className="hidden md:block" /> 
                    Focused preparation for MHT-CET, JEE, and NEET.
                </motion.p>

                {/* 4. Action Buttons - Added hover effects via CSS transforms for speed */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 transform-gpu"
                >
                    <Button onClick={()=>navigate('/register')} className={`${buttonClass} bg-slate-900 dark:bg-white text-white dark:text-black shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1`}>
                        <span className="relative z-10 flex items-center gap-2">
                            Start Journey <ArrowRight size={16} />
                        </span>
                    </Button>

                    <button onClick={()=>navigate('/register')} className={`${buttonClass} bg-transparent border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5`}>
                        View Courses
                    </button>
                </motion.div>
                
            </div>

            {/* Waves are heavy; forced to GPU layer */}
            <div className="absolute bottom-0 left-0 w-full pointer-events-none transform-gpu translate-z-0">
                <HeroWaves />
            </div>
        </section>
    );
}