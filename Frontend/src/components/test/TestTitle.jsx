import React, { memo } from 'react';
import { FileText, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

// Memoized Card: Taaki list re-render hone par cards lag na karein
const TestCard = memo(({ test, onSelect }) => (
    <div
        onClick={() => onSelect(test.testId)} // 🚀 CLICK ALWAYS ALLOWED (Retake ke liye)
        className={`group flex items-center justify-between p-5 mb-4 rounded-[2rem] border transition-all cursor-pointer active:scale-[0.98] ${
            test.isCompleted 
            ? 'bg-green-50/30 dark:bg-green-900/10 border-green-200 dark:border-green-800/50' 
            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:shadow-xl'
        }`}
    >
        <div className="flex items-center gap-4">
            {/* Icon dynamically changes if completed */}
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-colors ${
                test.isCompleted 
                ? 'bg-green-500 text-white shadow-lg shadow-green-200 dark:shadow-none' 
                : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
            }`}>
                {test.isCompleted ? <CheckCircle2 size={24} /> : <FileText size={24} />}
            </div>

            <div>
                <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-800 dark:text-white text-lg">{test.testTitle}</h3>
                    
                    {/* 🚀 PERMANENT INDICATOR BADGE */}
                    {test.isCompleted && (
                        <span className="bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                            Attempted
                        </span>
                    )}
                </div>
                
                <div className="flex items-center gap-3 mt-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Clock size={12} /> {test.totalQuestions} Qs</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>Std {test.standard}</span>
                    {test.isCompleted && (
                        <>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            <span className="text-green-600 dark:text-green-400 font-black">Retake Available</span>
                        </>
                    )}
                </div>
            </div>
        </div>

        <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
            test.isCompleted 
            ? 'bg-green-500 text-white' 
            : 'bg-slate-50 dark:bg-slate-800 text-slate-300 group-hover:bg-slate-900 group-hover:text-white'
        }`}>
            <ChevronRight size={20} />
        </div>
    </div>
));

export default function TestTitleList({ tests, onSelectTest }) {
    return (
        <div className="w-full max-w-3xl mx-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {tests?.map((test) => (
                <TestCard key={test.testId} test={test} onSelect={onSelectTest} />
            ))}
            
            {/* Empty State */}
            {tests?.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No tests found for this subject</p>
                </div>
            )}
        </div>
    );
}