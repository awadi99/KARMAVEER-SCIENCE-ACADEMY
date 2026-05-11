import React, { memo } from 'react';
import { Target, CheckCircle2, Clock } from 'lucide-react';

const MilestoneHeader = memo(({ 
    subject, 
    selectedStandard, 
    canSave, 
    currentCount, 
    targetSet, 
    setTargetSet 
}) => {
    return (
        <div className="mb-8 w-full transition-all duration-300">
            {/* Main Container */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                
                {/* Top Section: Subject & Status */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 items-center justify-center rounded bg-blue-50 px-2 text-[10px] font-black text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                CLASS {selectedStandard}
                            </div>
                            <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white sm:text-xl">
                                {subject} Assessment
                            </h2>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className={`h-2 w-2 rounded-full ${canSave ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                    {canSave ? "Validation Complete" : "Drafting in Progress"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats & Toggle Group */}
                    <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:border-0 sm:pt-0">
                        
                        {/* 🎯 Set Switcher (Education Style) */}
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Question Set</span>
                            <div className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                                {[20, 50].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setTargetSet(num)}
                                        className={`px-4 py-1.5 rounded-md text-[10px] font-black transition-all duration-200 ${
                                            targetSet === num 
                                            ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400' 
                                            : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Progress Counter */}
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-700">
                            <div className="text-right">
                                <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">Items</div>
                                <div className="text-xl font-black leading-none text-slate-900 dark:text-white sm:text-2xl">
                                    {currentCount}<span className="text-slate-300 dark:text-slate-600">/</span><span className="text-sm text-slate-400">{targetSet}</span>
                                </div>
                            </div>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-colors ${canSave ? 'border-emerald-500 bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10' : 'border-slate-100 bg-slate-50 text-slate-300 dark:border-slate-800 dark:bg-slate-800/50'}`}>
                                {canSave ? <CheckCircle2 size={20} /> : <Target size={20} />}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile Helper Text */}
            {!canSave && (
                <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-amber-50 py-2 dark:bg-amber-500/5">
                    <Clock size={12} className="text-amber-600" />
                    <p className="text-[10px] font-bold text-amber-700 dark:text-amber-500">
                        Requirement: Add {targetSet - currentCount} more questions to publish
                    </p>
                </div>
            )}
        </div>
    );
});

export default MilestoneHeader;