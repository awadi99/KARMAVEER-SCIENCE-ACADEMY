import React from 'react';

export default function MilestoneHeader({ subject, selectedStandard, canSave, nextGoal, currentCount }) {
    return (
        <div className="mb-12 flex items-center justify-between rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-2xl shadow-blue-500/30">
            <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight truncate max-w-[200px] sm:max-w-none">
                    {subject} • Class {selectedStandard}
                </h2>
                <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full animate-pulse ${canSave ? 'bg-green-400' : 'bg-yellow-400'}`} />
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                        {canSave ? "Milestone Achieved" : `Next Milestone: ${nextGoal} Questions`}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-16 w-16 shrink-0 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
                <span className="text-2xl font-black leading-none">{currentCount}</span>
                <span className="text-[8px] font-bold uppercase opacity-60">Total</span>
            </div>
        </div>
    );
}