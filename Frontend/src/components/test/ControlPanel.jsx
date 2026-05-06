import React from 'react';
import { Plus, Lock, CheckCircle2 } from 'lucide-react';

export default function ControlPanel({ onAdd, onPublish, currentCount, maxLimit, isPending, canSave, nextGoal }) {
    return (
        <div className="fixed bottom-8 left-1/2 z-[100] w-[95%] -translate-x-1/2 max-w-xl">
            <div className="flex items-center gap-3 rounded-[2.5rem] border border-slate-200/50 bg-white/80 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:border-slate-800/50 dark:bg-slate-900/90">
                <button 
                    onClick={onAdd} 
                    disabled={currentCount >= maxLimit || isPending} 
                    className="group flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-blue-600 hover:text-white disabled:opacity-20 dark:bg-slate-800 dark:text-slate-300"
                >
                    <Plus size={24} className="transition-transform group-hover:rotate-90" />
                </button>
                
                <button 
                    onClick={onPublish}
                    disabled={!canSave || isPending}
                    className={`flex h-12 sm:h-14 flex-1 items-center justify-center gap-3 rounded-full font-black text-white shadow-lg transition-all duration-500 ${
                        !canSave || isPending 
                        ? "bg-slate-300 dark:bg-slate-800 cursor-not-allowed grayscale" 
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/50 hover:scale-[1.02]"
                    }`}
                >
                    {isPending ? (
                        <span className="animate-pulse">Publishing...</span>
                    ) : (
                        <>
                            {!canSave ? <Lock size={18} /> : <CheckCircle2 size={20} />}
                            <span className="text-[10px] sm:text-xs uppercase tracking-widest">
                                {canSave ? "Publish to Students" : `Add ${nextGoal - currentCount} More`}
                            </span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}