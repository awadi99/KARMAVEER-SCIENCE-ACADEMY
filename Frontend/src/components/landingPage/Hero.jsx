import React, { useMemo } from "react";
import { ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import HeroWaves from './HeroWaves';

export default function Hero() {
    const navigate = useNavigate();

    // Memoizing styles to prevent re-calculation on every render
    const optimizedStyles = useMemo(() => ({
        section: { 
            contain: 'layout paint', // Improvement: CSS Containment stops layout shifts
            contentVisibility: 'auto' 
        },
        buttonClass: "px-6 py-3 md:px-8 md:py-3.5 font-semibold text-sm rounded-lg transition-all active:scale-95 touch-manipulation transform-gpu"
    }), []);

    return (
        <section
            id="hero"
            style={optimizedStyles.section}
            className="relative min-h-screen lg:min-h-[90dvh] flex items-center justify-center bg-[#F9FAFB] dark:bg-[#0F172A] pt-24 pb-24 lg:pt-32 transition-colors duration-300 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">

                    {/* TEXT CONTENT - Added will-change for smoother text rendering during color transitions */}
                    <div className="text-left order-2 lg:order-1 will-change-contents transform-gpu">
                        <div className="flex items-center gap-2 mb-4 md:mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#94A3B8]">
                                Admissions Open
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] dark:text-[#F1F5F9] leading-[1.15] mb-4 md:mb-6 tracking-tight">
                            Achieve Your Academic Goals with <br className="hidden sm:block" />
                            <span className="text-[#2563EB] dark:text-[#3B82F6]">Karmaveer Science Academy</span>
                        </h1>

                        <p className="text-sm md:text-base lg:text-lg text-[#6B7280] dark:text-[#94A3B8] mb-6 md:mb-8 leading-relaxed max-w-2xl">
                            Maharashtra’s premier coaching institute for 11th and 12th Science.
                            Specialized training for JEE, NEET, and MHT-CET.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8 md:mb-10">
                            {['Expert Faculty', 'Daily Practice Papers', 'Result-Oriented Method'].map((item) => (
                                <div key={item} className="flex items-center gap-2 transform-gpu">
                                    <CheckCircle2 size={18} className="text-[#10B981] dark:text-[#22C55E] shrink-0" />
                                    <span className="text-sm font-semibold text-[#111827] dark:text-[#F1F5F9]">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            <Button
                                onClick={() => navigate('/register')}
                                className={`${optimizedStyles.buttonClass} bg-[#2563EB] dark:bg-[#3B82F6] text-white hover:bg-opacity-90 shadow-lg w-full sm:w-auto`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Enroll Now <ArrowRight size={18} />
                                </span>
                            </Button>

                            <button
                                onClick={() => navigate('/courses')}
                                className={`${optimizedStyles.buttonClass} bg-white dark:bg-[#1E293B] text-[#111827] dark:text-[#F1F5F9] border border-[#D1D5DB] dark:border-[#334155] hover:bg-gray-50 dark:hover:bg-[#243347] w-full sm:w-auto`}
                            >
                                View Courses
                            </button>
                        </div>
                    </div>

                    {/* IMAGE CONTAINER - Optimized for iOS Safari Render */}
                    <div className="relative order-1 lg:order-2 transform-gpu">
                        <div className="bg-white dark:bg-[#1E293B] p-2 md:p-3 xl:p-4 rounded-2xl md:rounded-3xl shadow-xl lg:shadow-2xl border border-gray-100 dark:border-white/5 relative z-10 will-change-transform">
                            <img
                                src="/image/hero_bg.jpg"
                                alt="Student Success"
                                // Loading eager for hero image to prevent layout shift
                                loading="eager"
                                decoding="async"
                                className="rounded-xl md:rounded-2xl w-full object-cover aspect-video lg:aspect-[4/5] xl:aspect-[5/4] max-h-[300px] sm:max-h-[400px] lg:max-h-none transform-gpu"
                            />

                            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-[#10B981] dark:bg-[#22C55E] text-white p-3 md:p-5 rounded-xl md:rounded-2xl shadow-xl z-20 transform-gpu">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <GraduationCap size={20} className="md:w-7 md:h-7" />
                                    <div>
                                        <p className="text-[8px] md:text-[10px] font-bold uppercase opacity-80">Success Rate</p>
                                        <p className="text-base md:text-xl font-black leading-none mt-0.5 md:mt-1">98.5%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HERO WAVES - Prepared for GPU rendering */}
            <div className="absolute bottom-0 left-0 w-full leading-none z-0 pointer-events-none transform-gpu will-change-transform">
                <HeroWaves />
            </div>
        </section>
    );
}