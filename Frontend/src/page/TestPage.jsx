import React, { useState, useMemo, Suspense, lazy } from 'react';
import { FileText, ChevronLeft, GraduationCap, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SubjectGrid from '../components/test/SubjectGrid';
import TestTitleList from '../components/test/TestTitle';

const QuestionCreator = lazy(() => import('../components/test/index.jsx'));

import { useAuth } from '../hook/useAuth.js'; 
import { useTest } from '../hook/useTest.js';

export default function TestPage() {
    const { user, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();
    
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [maxLimit, setMaxLimit] = useState(20);

    // 🚀 FIXED: Destructuring data correctly from the hook
    const { useStudentTests } = useTest();
    const { data: schedules, isLoading: loadingSchedules } = useStudentTests(selectedSubject);

    // 🚀 FIXED: Case-insensitive filtering
    const filteredTests = useMemo(() => {
        if (!schedules || !selectedSubject) return [];
        return schedules.filter(t => 
            t.subject.toLowerCase() === selectedSubject.toLowerCase()
        );
    }, [schedules, selectedSubject]);

    const handleSubjectSelect = (name) => {
        setSelectedSubject(name);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (authLoading) return <div className="h-[80vh] flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

    const isAdmin = user?.role === 'admin';

    return (
        <div className="w-full max-w-[1400px] mx-auto isolate mt-5 px-4 pb-32">
            
            {/* --- HEADER --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                    {selectedSubject && (
                        <button onClick={() => setSelectedSubject(null)} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 shadow-sm active:scale-95 transition-all">
                            <ChevronLeft size={20} />
                        </button>
                    )}
                    <div>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">
                            {selectedSubject ? `Tests for ${selectedSubject}` : 'Examination Hub'}
                        </p>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                            {selectedSubject ? selectedSubject : 'Select Subject'}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="h-px w-full bg-slate-200 dark:bg-slate-800/50 mb-8" />

            <main>
                {!selectedSubject ? (
                    <SubjectGrid onSubjectSelect={handleSubjectSelect} />
                ) : (
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        {isAdmin ? (
                            <Suspense fallback={<Loader2 className="animate-spin" />}>
                                <QuestionCreator subject={selectedSubject} maxLimit={maxLimit} />
                            </Suspense>
                        ) : (
                            loadingSchedules ? (
                                <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>
                            ) : filteredTests.length > 0 ? (
                                <TestTitleList 
                                    tests={filteredTests} 
                                    onSelectTest={(testId) => navigate(`/dashboard/practice/${testId}`)} 
                                />
                            ) : (
                                <div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest">
                                    No Tests available for {selectedSubject}
                                </div>
                            )
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}