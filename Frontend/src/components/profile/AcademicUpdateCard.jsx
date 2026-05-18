import React, { useState, useCallback, memo } from 'react';
import { GraduationCap, Zap, CheckCircle2, Loader2, Target } from 'lucide-react';
import { useAuth } from '../../hook/useAuth.js';
import { useQueryClient } from '@tanstack/react-query'; // 1. Ye import karein

const SelectionButton = memo(({ label, isActive, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`relative flex-1 py-3.5 px-4 rounded-2xl font-bold transition-all duration-150 
        ${isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02] border-transparent' 
            : 'bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
        } disabled:opacity-40 disabled:scale-100 active:scale-[0.97] transform-gpu`}
        style={{ willChange: 'transform, opacity' }} 
    >
        <span className="flex items-center justify-center gap-2 text-xs sm:text-sm tracking-tight relative z-10">
            {label}
            {isActive && <CheckCircle2 size={16} className="shrink-0" />}
        </span>
    </button>
));

export default function AcademicUpdateCard({ user }) {
    const { updateProfile } = useAuth();
    const queryClient = useQueryClient(); 
    const [updatingField, setUpdatingField] = useState(null);


    const hasStandard = !!user?.standard;
    const hasStream = !!user?.stream;

    const handleUpdate = useCallback(async (field, value) => {
        // Safety guards to completely freeze updates on already selected values
        if (field === 'standard' && hasStandard) return;
        if (field === 'stream' && hasStream) return;
        if (user?.[field] === value || updatingField) return;

        setUpdatingField(field);
        try {
            
            const response = await updateProfile.mutateAsync({ [field]: value });

            /**
             * CRITICAL FIX: 
             * 'authUser' wahi key honi chahiye jo aapne useAuth hook mein 
             * queryKey ke liye use ki hai. Ye cache update karte hi 
             * App.jsx ka ProfileGuard instantly unlock ho jayega.
             */
            queryClient.setQueryData(['authUser'], (oldData) => {
                return response?.user ? response.user : { ...oldData, [field]: value };
            });

        } catch (err) {
            console.error("Sync Interrupted:", err);
        } finally {
            setUpdatingField(null);
        }
    }, [user, updateProfile, updatingField, queryClient, hasStandard, hasStream]);

    return (
        <div className="w-full bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-900 p-5 sm:p-7 shadow-sm overflow-hidden transform-gpu transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 h-12">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                        <Target size={20} />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none mb-1">Curriculum</h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest leading-none">Auto-Sync Active</p>
                    </div>
                </div>
                
                {updatingField && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                        <Loader2 size={12} className="animate-spin text-blue-600 dark:text-blue-400" />
                        <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase">Saving</span>
                    </div>
                )}
            </div>

            <div className="space-y-8">
                {/* Grade Level */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 flex items-center gap-2 px-1">
                        <GraduationCap size={12} /> Grade Level
                    </label>
                    <div className="flex gap-3">
                        {[11, 12].map((std) => (
                            <SelectionButton
                                key={std}
                                label={`Class ${std}th`}
                                isActive={user?.standard === std}
                                onClick={() => handleUpdate('standard', std)}
                                
                                disabled={!!updatingField || (hasStandard && user?.standard !== std)}
                            />
                        ))}
                    </div>
                </div>

                {/* Subject Stream */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 flex items-center gap-2 px-1">
                        <Zap size={12} /> Subject Stream
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                        {['PCM', 'PCB', 'PCMB'].map((stream) => (
                            <SelectionButton
                                key={stream}
                                label={stream}
                                isActive={user?.stream === stream}
                                onClick={() => handleUpdate('stream', stream)}
                                
                                disabled={!!updatingField || (hasStream && user?.stream !== stream)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Insight */}
            <div className="mt-8 flex items-center gap-3 opacity-80 border-t border-slate-100 dark:border-slate-900 pt-6">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <p className="text-[10px] text-slate-500 dark:text-slate-500 font-medium">
                    Engine pre-fetched for <span className="text-slate-900 dark:text-slate-200">{user?.stream || 'Core'}</span> curriculum.
                </p>
            </div>
        </div>
    );
}