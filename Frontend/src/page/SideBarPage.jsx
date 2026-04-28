import React, { useState, useCallback, memo } from "react";
import { Menu, GraduationCap, Moon, Sun, X, LayoutDashboard } from "lucide-react";
import SidebarMenu from "../components/sidebar/SidebarMenu";

/**
 * 1. PERFORMANCE: CSS-only Background. 
 * Replaced expensive blur 'auras' with a clean, high-performance solid background.
 */
export default function Sidebar({ isDark, setIsDark }) {
    const [open, setOpen] = useState(false);
    const toggleSidebar = useCallback(() => setOpen(prev => !prev), []);

    return (
        <>
            {/* MOBILE TOGGLE: Clean, academic blue accent */}
            {!open && (
                <button
                    onClick={toggleSidebar}
                    className="md:hidden fixed top-5 left-5 z-[60] p-2.5 rounded-lg bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 transition-all active:scale-95"
                >
                    <Menu size={20} className="text-blue-600 dark:text-blue-400" />
                </button>
            )}

            {/* BACKDROP: Using simple opacity for lag-free performance */}
            <div 
                onClick={toggleSidebar}
                className={`fixed inset-0 bg-slate-900/30 z-[70] md:hidden transition-opacity duration-300 ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            <aside
                className={`
                    fixed top-0 left-0 h-screen w-64 z-[80]
                    flex flex-col border-r bg-white dark:bg-[#0F172A] 
                    border-slate-200 dark:border-slate-800
                    /* Snappy ease-out transition for instant feel */
                    transition-transform duration-200 ease-out transform-gpu
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
                style={{ willChange: 'transform' }} 
            >
                {/* 2. ACADEMIC HEADER: Removed gradients for solid institutional branding */}
                <div className="px-6 py-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                            <img src="/image/logo.jpeg"  className="h-8 w-8 rounded-4xl" alt="logo" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="font-bold text-base tracking-tight dark:text-white text-slate-900">
                                Karmaveer
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                Academy
                            </span>
                        </div>
                    </div>
                    <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-slate-600"><X size={18} /></button>
                </div>

                {/* 3. NAVIGATION: Using overscroll-contain to stop 'rubber-banding' lag */}
                <div className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-1 overscroll-contain">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-4">
                        Main Portal
                    </div>
                    <SidebarMenu expanded={true} />
                </div>

                {/* 4. FOOTER: Redesigned for a clean SaaS/Educational look */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    {/* Theme Switcher: Professional solid-style buttons */}
                    <div className="flex p-1 mb-4 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 gap-1">
                        <ThemeBtn active={!isDark} onClick={() => setIsDark(false)} icon={<Sun size={14} />} label="Light" />
                        <ThemeBtn active={isDark} onClick={() => setIsDark(true)} icon={<Moon size={14} />} label="Dark" />
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-3 flex items-center gap-3 border border-slate-200 dark:border-slate-700 shadow-sm transition-transform active:scale-95">
                        <div className="relative h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                            <LayoutDashboard size={16} />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-[12px] font-semibold dark:text-slate-200 text-slate-900 leading-none">Instructor</h4>
                            <span className="text-[10px] text-slate-400 font-medium">Verified Admin</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

const ThemeBtn = memo(({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md transition-all duration-150 ${
            active 
            ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
        }`}
    >
        {icon}
        <span className="text-[10px] font-semibold uppercase">{label}</span>
    </button>
));