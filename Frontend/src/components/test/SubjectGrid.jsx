import React, { memo } from 'react';
import * as Icons from 'lucide-react';
import { testData } from './testData';

const SubjectCard = memo(({ subject }) => {
    // 1. PERFORMANCE: Direct icon lookup
    const Icon = Icons[subject.icon] || Icons.Book;

    return (
        <div className={`
            flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200
            cursor-pointer active:scale-95 bg-white dark:bg-slate-900
            hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none
            transform-gpu group ${subject.border}
        `}>
            {/* 2. OPTIMIZATION: Using subject.bg and subject.text directly from your data */}
            <div className={`
                flex h-12 w-12 shrink-0 items-center justify-center rounded-xl 
                transition-colors duration-200 ${subject.bg} ${subject.text}
            `}>
                <Icon size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            </div>

            {/* Subject Name & Standard Info */}
            <div className="flex flex-col overflow-hidden">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate tracking-tight">
                    {subject.name}
                </h3>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
                    Standard 11, 12
                </span>
            </div>
        </div>
    );
});

export default function SubjectGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {testData.map((sub) => (
                <SubjectCard key={sub.id} subject={sub} />
            ))}
        </div>
    );
}