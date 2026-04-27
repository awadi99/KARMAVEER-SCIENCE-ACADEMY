import { useState, useCallback, memo } from "react";
import { Menu, Atom, GraduationCap, Moon, Sun, X } from "lucide-react";
import SidebarMenu from "../components/sidebar/SidebarMenu";

// 1. PERFORMANCE: Remove 'blur' from moving components.
// We use a solid color background for the moving panel and only apply blur to a static child.
const BackgroundAuras = memo(({ isDark }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-500/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-20 -right-24 w-80 h-80 bg-blue-400/20 blur-[100px] rounded-full" />
    </div>
));

export default function Sidebar({ isDark, setIsDark }) {
    const [open, setOpen] = useState(false);
    const toggleSidebar = useCallback(() => setOpen(prev => !prev), []);

    return (
        <>
            {/* TOGGLE: Uses simple CSS transform instead of Framer Motion for instant response */}
            {!open && (
                <button
                    onClick={toggleSidebar}
                    className="md:hidden fixed top-6 left-6 z-[60] p-3 rounded-2xl bg-white dark:bg-[#0A0A0C] shadow-xl border border-slate-200 dark:border-white/5 active:scale-95 transition-all transform-gpu"
                >
                    <Menu size={20} className="text-indigo-600 dark:text-white" />
                </button>
            )}

            {/* BACKDROP: Using opacity only (blur is expensive during animation) */}
            <div 
                onClick={toggleSidebar}
                className={`fixed inset-0 bg-slate-900/40 dark:bg-black/60 z-[70] md:hidden transition-opacity duration-300 ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            <aside
                className={`
                    fixed top-0 left-0 h-screen w-72 z-[80]
                    flex flex-col border-r
                    /* PERFORMANCE: Use cubic-bezier for "snappy" feel and transform-gpu */
                    transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] transform-gpu
                    bg-white dark:bg-[#050507] border-indigo-100/40 dark:border-white/[0.05]
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
                style={{ willChange: 'transform' }} // Pre-warms the GPU
            >
                {/* 2. OPTIMIZATION: Only show auras when sidebar is static or on desktop */}
                <BackgroundAuras isDark={isDark} />

                {/* Header */}
                <div className="relative px-8 py-10 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center shadow-lg">
                            <Atom size={22} className="text-white" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-black text-lg uppercase tracking-tight dark:text-white text-slate-900">Karmaveer</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500">Academy</span>
                        </div>
                    </div>
                    <button onClick={toggleSidebar} className="md:hidden text-slate-400 p-1"><X size={20} /></button>
                </div>

                {/* Navigation: Added 'overscroll-contain' to prevent body scroll lag */}
                <div className="relative flex-1 overflow-y-auto no-scrollbar px-4 z-10 overscroll-contain">
                    <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-4 opacity-70">Menu</div>
                    <SidebarMenu expanded={true} />
                </div>

                {/* Footer */}
                <div className="relative p-6 mt-auto z-10 border-t border-slate-50 dark:border-white/[0.02]">
                    <div className="flex p-1 mb-6 rounded-xl bg-slate-100/50 dark:bg-white/[0.03] border border-white dark:border-white/[0.05] gap-1">
                        <ThemeBtn active={!isDark} onClick={() => setIsDark(false)} icon={<Sun size={14} />} label="Light" />
                        <ThemeBtn active={isDark} onClick={() => setIsDark(true)} icon={<Moon size={14} />} label="Dark" />
                    </div>

                    <div className="bg-slate-50 dark:bg-[#0A0A0C] rounded-2xl p-4 flex items-center gap-4 border border-slate-100 dark:border-white/5 active:scale-[0.98] transition-transform">
                        <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-white/5 flex items-center justify-center text-indigo-600">
                            <GraduationCap size={18} />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <h4 className="text-[11px] font-bold dark:text-white">Admin Portal</h4>
                            <span className="text-[9px] text-green-500 font-bold uppercase">Online</span>
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
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-200 ${
            active 
            ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm' 
            : 'text-slate-500 hover:text-slate-700'
        }`}
    >
        {icon}
        <span className="text-[10px] font-bold uppercase">{label}</span>
    </button>
));