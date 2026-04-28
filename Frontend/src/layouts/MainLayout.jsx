import { Outlet } from "react-router-dom";
import Sidebar from "../page/SideBarPage";

export default function MainLayout({ isDark, setIsDark }) {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-[#0B0F1A] overflow-x-hidden selection:bg-blue-100 selection:text-blue-700">
            <Sidebar isDark={isDark} setIsDark={setIsDark} />

            <div className="flex-1 flex flex-col min-w-0 md:ml-64 transition-all duration-300 ease-in-out">
                {/* OPTIMIZATION: 
                   1. Removed 'border-b' to kill the sharp line.
                   2. Added 'dark:bg-white/[0.01]'—this tiny bit of tint helps the blur look "real" without a line.
                */}
                <header className="fixed top-0 z-40 w-full h-14 px-6 flex items-center justify-between bg-transparent backdrop-blur-xl backdrop-saturate-150 will-change-transform">
                    {/* Optional: Add a very faint, almost invisible bottom shadow instead of a line */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200/20 dark:via-white/[0.05] to-transparent" />
                </header>

                <main className="relative flex-1 p-4 sm:p-6 lg:p-10 w-full mt-10">
                    {/* Background Blur */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue-600/[0.02] dark:bg-blue-500/[0.04] blur-[120px] rounded-full transform-gpu" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}