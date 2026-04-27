import React from 'react';
import ListStudent from '../components/student/ListStudent';
import { Search } from 'lucide-react';

export default function Student() {
    return (
        <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto will-change-scroll">
            {/* Header: Simplified for faster layout engine processing */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] leading-none">Management</p>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Students</h1>
                </div>

                {/* Performance Search: Removed relative group hover effects */}
                <div className="w-full sm:w-72">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                            type="text" 
                            placeholder="FIND STUDENT..."
                            className="w-full bg-slate-100 dark:bg-white/[0.03] border-none rounded-xl py-3 pl-10 pr-4 text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* List Section: transform-gpu ensures this renders on its own layer */}
            <div className="transform-gpu">
                <ListStudent />
            </div>
        </div>
    );
}