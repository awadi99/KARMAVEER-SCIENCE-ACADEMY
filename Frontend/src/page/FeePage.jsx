import React from 'react';

import { Search, GraduationCap, IndianRupee } from 'lucide-react';
import FeesList from '../components/fee/FeesList';

export default function FeePage() {
    return (
        /* THEME: Navy & Slate (Professional/Trustworthy) 
           - Replaced dark background with a very soft 'slate-50' for light mode
           - Replaced deep black with 'slate-950' for dark mode
        */
        <div className="p-4 sm:p-6 space-y-8 max-w-7xl mx-auto isolate min-h-screen">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 transform-gpu">
                <div className="flex items-center gap-4">
                    {/* Visual Anchor: An icon helps it feel like a school portal */}
                    <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-blue-600 items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <IndianRupee size={24} />
                    </div>
                    
                    <div className="space-y-0.5">
                        <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest leading-none">
                            Academic Records
                        </p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                        Fee Structure
                        </h1>
                    </div>
                </div>

                {/* Refined Search Input */}
                
            </div>

            {/* Content Divider: Subtle line to separate header from content */}
            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />

            {/* List Section */}
            <div className="transform-gpu" style={{ contain: 'layout' }}>
                <FeesList/>
            </div>
        </div>
    );
}