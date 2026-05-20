import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, Layout, ListChecks } from 'lucide-react';
import { toast } from 'react-toastify';

export default function QuesPaper({ testData, onFinish }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [showPalette, setShowPalette] = useState(false); // Mobile ke liye Toggle

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
        const unAttemptedQuestions = testData.questions.filter((q, i) => {
            const key = q._id || i;
            return answers[key] === undefined || answers[key] === null;
        });

        if (unAttemptedQuestions.length > 0) {
            toast.error(`Test not completed! ${unAttemptedQuestions.length} questions are still unanswered.`);
            return;
        }
        onFinish(answers);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 h-[90vh] p-2 sm:p-4">
            {/* Main Area */}
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
                    <h2 className="font-black text-slate-800 dark:text-white truncate text-xs sm:text-sm tracking-widest uppercase">{testData.testTitle}</h2>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowPalette(!showPalette)} className="lg:hidden p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <ListChecks size={18} />
                        </button>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase">
                            Q. {currentIdx + 1} / {testData.totalQuestions}
                        </span>
                    </div>
                </div>

                <div className="flex-1 p-6 sm:p-12 overflow-y-auto custom-scroll">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 leading-tight">
                            {currentQuestion.qText}
                        </p>
                        <div className="grid gap-3 sm:gap-4">
                            {currentQuestion.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    className={`w-full p-4 sm:p-5 rounded-[1.5rem] border-2 text-left font-bold transition-all active:scale-[0.98] flex items-center gap-4 ${
                                        answers[currentQuestion._id || currentIdx] === i
                                        ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/20'
                                        : 'border-slate-100 hover:border-slate-300 dark:border-slate-800'
                                    }`}
                                >
                                    <span className={`h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center text-[10px] sm:text-xs font-black transition-colors ${
                                        answers[currentQuestion._id || currentIdx] === i ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                                    }`}>
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    <span className="text-sm sm:text-base">{opt}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-6 border-t border-slate-50 dark:border-slate-800 flex justify-between bg-white dark:bg-slate-900">
                    <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)} className="px-4 py-2 font-black text-slate-400 disabled:opacity-0 flex items-center gap-2">
                        <ChevronLeft size={18} /> PREV
                    </button>
                    {currentIdx === testData.totalQuestions - 1 ? (
                        <button onClick={handleFinishTest} className="bg-green-600 text-white px-6 py-2 rounded-2xl font-black shadow-lg flex items-center gap-2 active:scale-95 text-xs">
                            FINISH <Send size={14} />
                        </button>
                    ) : (
                        <button onClick={() => setCurrentIdx(prev => prev + 1)} className="bg-slate-900 dark:bg-blue-600 text-white px-6 py-2 rounded-2xl font-black shadow-xl flex items-center gap-2 active:scale-95 text-xs">
                            NEXT <ChevronRight size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation Palette (Responsive Overlay) */}
            <div className={`fixed lg:static inset-y-0 right-0 z-50 w-72 lg:w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 shadow-2xl lg:shadow-none transition-transform duration-300 ${showPalette ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2"><Layout size={16} className="text-slate-400" /> <span className="text-[10px] font-black uppercase tracking-widest">Palette</span></div>
                    <button className="lg:hidden" onClick={() => setShowPalette(false)}>✕</button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {testData.questions.map((q, i) => (
                        <button key={i} onClick={() => { setCurrentIdx(i); setShowPalette(false); }} className={`h-10 w-10 rounded-lg flex items-center justify-center font-black text-xs transition-all ${
                            currentIdx === i ? 'ring-2 ring-blue-600' : ''
                        } ${answers[q._id || i] !== undefined ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}