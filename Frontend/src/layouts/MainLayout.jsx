import { Outlet } from "react-router-dom";
import Sidebar from "../page/SideBarPage";

export default function MainLayout({ isDark, setIsDark }) {
    return (
        <div className="flex min-h-screen bg-[#F8FAFF] dark:bg-[#050507]">
            {/* Sidebar width is 72 (18rem), so we match that exactly */}
            <Sidebar isDark={isDark} setIsDark={setIsDark} />
            
            {/* 1. Adjusted md:ml-72 to md:ml-64 or match sidebar precisely */}
            {/* 2. Reduced padding from p-10 to p-6 for a tighter fit */}
            <div className="flex-1 flex flex-col min-w-0 md:ml-72 transition-all duration-500"> 
                
                {/* Glassy Top Header - Height reduced for better vertical space */}
                <div className="sticky top-0 z-40 bg-white/40 dark:bg-black/20 backdrop-blur-md h-14 w-full border-b border-black/5 dark:border-white/5"></div>
                
                {/* 3. Reduced p-10 to p-4/p-6 and removed max-w restriction if you want it closer */}
                <main className="relative flex-1 p-4 sm:p-5 md:p-6 w-full transition-all">
                    
                    {/* Background Decorative Glows - Optimized blur to prevent lag */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 left-0 w-[30%] h-[30%] bg-violet-600/5 blur-[80px] rounded-full" />
                    </div>

                    <div className="relative z-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}