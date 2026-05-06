import React, { memo } from 'react';
import { FileText, ChevronRight, Clock } from 'lucide-react';

// Memoized Card: Taaki list re-render hone par cards lag na karein
const TestCard = memo(({ test, onSelect }) => (
    <div
        onClick={() => onSelect(test.testId)}
        className="group flex items-center justify-between p-5 mb-4 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer active:scale-[0.98]"
    >
        <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <FileText size={24} />
            </div>
            <div>
                <h3 className="font-black text-slate-800 dark:text-white text-lg">{test.testTitle}</h3>
                <div className="flex items-center gap-3 mt-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Clock size={12} /> {test.totalQuestions} Qs</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>Std {test.standard}</span>
                </div>
            </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
            <ChevronRight size={20} />
        </div>
    </div>
));

export default function TestTitleList({ tests, onSelectTest }) {
    return (
        <div className="w-full max-w-3xl mx-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {tests?.map((test) => (
                <TestCard key={test._id} test={test} onSelect={onSelectTest} />
            ))}
        </div>
    );
}