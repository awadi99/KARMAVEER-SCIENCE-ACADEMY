import React from 'react';
import ListStudent from '../components/student/ListStudent';
import { Search, GraduationCap } from 'lucide-react';

export default function Student() {
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
                        <GraduationCap size={24} />
                    </div>
                    
                    <div className="space-y-0.5">
                        <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest leading-none">
                            Academic Records
                        </p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                            Student Directory
                        </h1>
                    </div>
                </div>

                {/* Refined Search Input */}
                <div className="w-full sm:w-80">
                    <div className="relative group">
                        <Search 
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" 
                            size={16} 
                        />
                        <input 
                            type="text" 
                            placeholder="Search by student name..."
                            /* Academic UI uses softer borders and more generous white space.
                               Removed 'font-black' for a cleaner 'font-medium'.
                            */
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Content Divider: Subtle line to separate header from content */}
            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />

            {/* List Section */}
            <div className="transform-gpu" style={{ contain: 'layout' }}>
                <ListStudent />
            </div>
        </div>
    );
}