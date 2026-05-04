import React, { useState, useEffect, useDeferredValue } from 'react';
import ListStudent from '../components/student/ListStudent';
import { Search, GraduationCap } from 'lucide-react';

export default function Student() {
    const [searchTerm, setSearchTerm] = useState('');
    
    // useDeferredValue: Ye React 18 ka feature hai jo search input ko 
    // priority deta hai aur list rendering ko background mein rakhta hai 
    // taaki typing "laggy" mehsoos na ho.
    const deferredSearchTerm = useDeferredValue(searchTerm);

    return (
        <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto min-h-screen selection:bg-blue-100">
            
            {/* Header Section: Mobile-optimized Flex */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 rounded-2xl bg-blue-600 items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <GraduationCap size={24} />
                    </div>
                    
                    <div className="min-w-0">
                        <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] leading-none mb-1">
                            Academic System
                        </p>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight truncate">
                            Student Directory
                        </h1>
                    </div>
                </div>

                {/* Search Input: Full width on mobile, 320px on desktop */}
                <div className="relative w-full lg:w-80 group">
                    <Search 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" 
                        size={18} 
                    />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search records..."
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none shadow-sm"
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            {/* List Container: Optimized for GPU Rendering */}
            <main 
                className="will-change-contents transform-gpu"
                style={{ 
                    contentVisibility: 'auto', // Browser optimization for long lists
                    containIntrinsicSize: '0 500px' 
                }}
            >
                <ListStudent searchTerm={deferredSearchTerm} />
            </main>
        </div>
    );
}