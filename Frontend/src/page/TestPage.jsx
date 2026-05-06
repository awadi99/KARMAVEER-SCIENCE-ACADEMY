import React, { useState, useMemo, Suspense, lazy } from 'react';
import { FileText, ChevronLeft, GraduationCap, Loader2, Type } from 'lucide-react';
import SubjectGrid from '../components/test/SubjectGrid';
import TestTitleList from '../components/test/TestTitle';

// Admin component lazy load ho raha hai bundle size optimize karne ke liye
const QuestionCreator = lazy(() => import('../components/test/index.jsx'));

import { useAuth } from '../hook/useAuth.js'; 
import { useTest } from '../hook/useTest.js';

export default function TestPage() {
    const { user, isLoading: authLoading } = useAuth();
    const { schedules, loadingSchedules } = useTest(); 
    
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [maxLimit, setMaxLimit] = useState(20);

    // Filter logic for 1,000+ users (Memoized)
    const filteredTests = useMemo(() => {
        if (!schedules || !selectedSubject) return [];
        return schedules.filter(t => t.subject === selectedSubject);
    }, [schedules, selectedSubject]);

    const handleSubjectSelect = (name) => {
        setSelectedSubject(name);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (authLoading) {
        return (
            <div className="h-[80vh] w-full flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    const isAdmin = user?.role === 'admin';

    return (
        <div className="w-full max-w-[1400px] mx-auto isolate mt-5 px-4 pb-32">
            
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                    {selectedSubject ? (
                        <button 
                            onClick={() => setSelectedSubject(null)} 
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm active:scale-95 transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    ) : (
                        <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl items-center justify-center text-white shadow-lg ${isAdmin ? 'bg-blue-600 shadow-blue-500/20' : 'bg-indigo-600 shadow-indigo-500/20'}`}>
                            {isAdmin ? <FileText size={20} /> : <GraduationCap size={20} />}
                        </div>
                    )}
                    
                    <div>
                        <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] leading-none mb-1">
                            {selectedSubject 
                                ? (isAdmin ? 'Admin: Question Management' : `Tests for ${selectedSubject}`)
                                : (isAdmin ? 'Control Center' : 'Examination Hub')}
                        </p>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            {selectedSubject ? selectedSubject : 'Select Subject'}
                        </h1>
                    </div>
                </div>

                {selectedSubject && isAdmin && (
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                        {[20, 50].map((limit) => (
                            <button 
                                key={limit} 
                                onClick={() => setMaxLimit(limit)} 
                                className={`px-5 py-1.5 rounded-xl text-xs font-black transition-all ${
                                    maxLimit === limit 
                                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {limit} Qs
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="h-px w-full bg-slate-200 dark:bg-slate-800/50 mb-8" />

            <main>
                {!selectedSubject ? (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <SubjectGrid onSubjectSelect={handleSubjectSelect} />
                    </div>
                ) : (
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        {isAdmin ? (
                            <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>}>
                                <QuestionCreator 
                                    subject={selectedSubject} 
                                    maxLimit={maxLimit} 
                                />
                            </Suspense>
                        ) : (
                            loadingSchedules ? (
                                <div className="flex justify-center p-20"><Loader2 className="animate-spin text-slate-300" /></div>
                            ) : (
                                <TestTitleList 
                                    tests={filteredTests} 
                                    onSelectTest={(testId) => console.log("Navigating to test:", testId)} 
                                />
                            )
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}