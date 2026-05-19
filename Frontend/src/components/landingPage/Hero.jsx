import React, { useMemo } from "react";
import { ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import HeroWaves from './HeroWaves';
import HeroBackground from './HeroBackground'; // 🚀 Imported clean sub-component
import herobg from '../../assets/website/hero_bg.jpeg';

// 🚀 HIGH-CONCURRENCY RESPONSIVE HERO CONTAINER
export default function Hero() {
    const navigate = useNavigate();

    // Paint containment optimization layer
    const optimizedStyles = useMemo(() => ({
        section: { 
            contain: 'layout paint style', 
            contentVisibility: 'auto' 
        },
        buttonClass: "px-6 py-3 md:px-8 md:py-3.5 font-bold text-xs sm:text-sm rounded-xl transition-all active:scale-95 touch-manipulation transform-gpu shadow-sm"
    }), []);

    return (
        <section
            id="hero"
            style={optimizedStyles.section}
            className="relative min-h-screen lg:min-h-[92dvh] flex items-center justify-center bg-[#F9FAFB] dark:bg-[#0F172A] pt-20 pb-16 sm:pb-24 lg:pt-28 transition-colors duration-300 overflow-hidden"
        >
            {/* 🛠️ Isolated background component injected clean here */}
            <HeroBackground />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-16 items-center">

                    {/* Left Column: Core Branding Context Elements */}
                    <div className="text-left order-2 lg:order-1 will-change-contents transform-gpu">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-[#94A3B8]">
                                Admissions Open 
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-6xl font-black text-slate-900 dark:text-[#F1F5F9] leading-[1.15] mb-5 tracking-tight">
                            Achieve Your Academic Goals with <br className="hidden sm:block" />
                            <span className="text-[#2563EB] dark:text-[#3B82F6] relative inline-block drop-shadow-sm">
                                Karmaveer Science Academy
                            </span>
                        </h1>

                        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-[#94A3B8] mb-6 md:mb-8 leading-relaxed max-w-xl">
                            Maharashtra’s premier coaching institute for 11th and 12th Science. 
                            Specialized data-driven training structures for <span className="font-semibold text-slate-800 dark:text-slate-200">JEE and MHT-CET</span> templates.
                        </p>

                        {/* Highlight Feature Checklists */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                            {['Expert Faculty Matrix', 'Daily Practice Papers (DPP)', 'Result-Oriented Method'].map((item) => (
                                <div key={item} className="flex items-center gap-2.5 transform-gpu">
                                    <CheckCircle2 size={16} className="text-[#10B981] dark:text-[#22C55E] shrink-0" />
                                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-[#F1F5F9]">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md sm:max-w-none">
                            <Button
                                onClick={() => navigate('/register')}
                                className={`${optimizedStyles.buttonClass} bg-[#2563EB] dark:bg-[#3B82F6] text-white hover:bg-blue-700 dark:hover:bg-blue-600 w-full sm:w-auto`}
                            >
                                <span className="flex items-center justify-center gap-2 uppercase tracking-wider">
                                    Enroll Now <ArrowRight size={16} />
                                </span>
                            </Button>

                            <button
                                onClick={() => navigate('/courses')}
                                className={`${optimizedStyles.buttonClass} bg-white dark:bg-[#1E293B] text-slate-800 dark:text-[#F1F5F9] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#243347] w-full sm:w-auto uppercase tracking-wider`}
                            >
                                View Courses
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Clean Institutional Frame (Fully Un-cropped Foreground Image) */}
                    <div className="relative order-1 lg:order-2 transform-gpu max-w-md lg:max-w-none mx-auto w-full">
                        <div className="bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md p-2.5 rounded-2xl shadow-md border border-slate-200/50 dark:border-white/5 relative z-10 will-change-transform">
                            <img
                                src={herobg} 
                                alt="Karmaveer Science Academy Infrastructure"
                                loading="eager"
                                decoding="async"
                                className="rounded-xl w-full h-auto object-contain bg-slate-50 dark:bg-slate-900 transform-gpu"
                            />

                            {/* Sticky Stats Analytics Tag */}
                            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-[#10B981] dark:bg-[#22C55E] text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg z-20 transform-gpu">
                                <div className="flex items-center gap-2.5">
                                    <GraduationCap size={22} className="shrink-0" />
                                    <div>
                                        <p className="text-[8px] sm:text-[9px] font-bold uppercase opacity-85 tracking-wider">Track Record</p>
                                        <p className="text-sm sm:text-lg font-black leading-none mt-0.5">98.5% Pass</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Pure SVG Wave Bottom Spacer */}
            <div className="absolute bottom-0 left-0 w-full leading-none z-10 pointer-events-none transform-gpu will-change-transform">
                <HeroWaves />
            </div>
        </section>
    );
}