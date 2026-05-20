import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, Layout, ListChecks } from 'lucide-react';
import { toast } from 'react-toastify';

export default function QuesPaper({ testData, onFinish }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [showPalette, setShowPalette] = useState(false); // Mobile ke liye toggle

    const [answers, setAnswers] = useState(() => {
        const saved = localStorage.getItem(`prac_${testData.testId}`);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem(`prac_${testData.testId}`, JSON.stringify(answers));
    }, [answers, testData.testId]);

    const currentQuestion = useMemo(() => testData.questions[currentIdx], [testData.questions, currentIdx]);

    const handleSelect = useCallback((idx) => {
        setAnswers(prev => ({ ...prev, [currentQuestion._id || currentIdx]: idx }));
    }, [currentQuestion._id, currentIdx]);

    const handleFinishTest = () => {
        const unAttemptedCount = testData.questions.filter((q, i) => 
            answers[q._id || i] === undefined
        ).length;

        if (unAttemptedCount > 0) {
            toast.error(`Complete all ${unAttemptedCount} remaining questions!`);
            return;
        }
        onFinish(answers);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 h-[90vh] overflow-hidden p-2 sm:p-4">
            {/* Main Area */}
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Header - Fixed Height */}
                <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50">
                    <h2 className="font-black text-slate-800 dark:text-white text-[10px] sm:text-xs tracking-widest uppercase truncate">
                        {testData.testTitle}
                    </h2>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowPalette(!showPalette)} className="lg:hidden p-2 bg-slate-200 dark:bg-slate-800 rounded-lg">
                            <ListChecks size={16} />
                        </button>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                            Q. {currentIdx + 1}/{testData.totalQuestions}
                        </span>
                    </div>
                </div>

                {/* Question Area - Scrollable */}
                <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
                    <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-8 leading-snug">
                        {currentQuestion.qText}
                    </p>
                    <div className="grid gap-3">
                        {currentQuestion.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(i)}
                                className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 ${
                                    answers[currentQuestion._id || currentIdx] === i
                                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/20'
                                    : 'border-slate-100 hover:border-slate-300 dark:border-slate-800'
                                }`}
                            >
                                <span className={`h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-black ${
                                    answers[currentQuestion._id || currentIdx] === i ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                                }`}>
                                    {String.fromCharCode(65 + i)}
                                </span>
                                <span className="text-sm sm:text-base">{opt}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-slate-100 flex justify-between items-center">
                    <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(p => p - 1)} className="text-[10px] font-black text-slate-400 disabled:opacity-0 flex items-center gap-1">
                        <ChevronLeft size={16} /> PREV
                    </button>
                    {currentIdx === testData.totalQuestions - 1 ? (
                        <button onClick={handleFinishTest} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-lg active:scale-95 transition-transform">
                            SUBMIT TEST
                        </button>
                    ) : (
                        <button onClick={() => setCurrentIdx(p => p + 1)} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-xs active:scale-95 transition-transform">
                            NEXT <ChevronRight size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Question Palette - Mobile Side Sheet */}
            <div className={`fixed inset-y-0 right-0 z-50 w-72 bg-white dark:bg-slate-900 border-l shadow-2xl p-6 transition-transform lg:static lg:transform-none lg:w-80 ${showPalette ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2"><Layout size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Palette</span></div>
                    <button className="lg:hidden" onClick={() => setShowPalette(false)}>✕</button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {testData.questions.map((q, i) => (
                        <button key={i} onClick={() => { setCurrentIdx(i); setShowPalette(false); }} className={`h-10 w-10 rounded-lg text-xs font-black transition-colors ${
                            currentIdx === i ? 'ring-2 ring-blue-600' : ''
                        } ${answers[q._id || i] !== undefined ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}