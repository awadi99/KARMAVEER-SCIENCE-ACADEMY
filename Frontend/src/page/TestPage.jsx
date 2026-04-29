import React, { useState } from 'react';
import { FileText, ChevronLeft } from 'lucide-react';
import SubjectGrid from '../components/test/SubjectGrid';
// 1. Import your new third component
import QuestionCreator from '../components/test/QuestionCreator'; 

export default function TestPage() {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [maxLimit, setMaxLimit] = useState(20);

    const handleSubjectSelect = (name) => {
        setSelectedSubject(name);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto isolate mt-5 px-4 pb-32">
            
            {/* HEADER SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                    {selectedSubject ? (
                        <button 
                            onClick={() => setSelectedSubject(null)} 
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 shadow-sm active:scale-95 transition-all hover:bg-slate-50"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    ) : (
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl bg-blue-600 items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <FileText size={20} strokeWidth={2.5} />
                        </div>
                    )}
                    
                    <div>
                        <p className="text-[9px] sm:text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none">
                            {selectedSubject ? 'Step 2: Add Questions' : 'Admin Control Panel'}
                        </p>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                            {selectedSubject ? `${selectedSubject} Creator` : 'Subject Tests'}
                        </h1>
                    </div>
                </div>

                {/* LIMIT SELECTOR (Only shows when a subject is picked) */}
                {selectedSubject && (
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-fit border border-slate-200 dark:border-slate-700">
                        {[20, 50].map((limit) => (
                            <button 
                                key={limit} 
                                onClick={() => setMaxLimit(limit)} 
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
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

            <div className="h-px w-full bg-slate-200 dark:bg-slate-800/40 mb-8" />

            {/* DYNAMIC CONTENT AREA */}
            <main>
                {!selectedSubject ? (
                    // SHOW GRID
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        <SubjectGrid onSubjectSelect={handleSubjectSelect} />
                    </div>
                ) : (
                    // SHOW CREATOR (The Third Component)
                    <QuestionCreator 
                        subject={selectedSubject} 
                        maxLimit={maxLimit} 
                    />
                )}
            </main>
        </div>
    );
}