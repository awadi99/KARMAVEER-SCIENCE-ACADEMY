import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, Layout } from 'lucide-react';
import { toast } from 'react-toastify';

export default function QuesPaper({ testData, onFinish }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    
    // 🚀 RESTORE: Page refresh hone par data wapas lao
    const [answers, setAnswers] = useState(() => {
        const saved = localStorage.getItem(`prac_${testData.testId}`);
        return saved ? JSON.parse(saved) : {};
    });

  
    useEffect(() => {
        localStorage.setItem(`prac_${testData.testId}`, JSON.stringify(answers));
    }, [answers, testData.testId]);

    const currentQuestion = useMemo(() => testData.questions[currentIdx], [testData, currentIdx]);

    const handleSelect = useCallback((idx) => {
        setAnswers(prev => ({ ...prev, [currentQuestion._id || currentIdx]: idx }));
    }, [currentQuestion._id, currentIdx]);


    const handleFinishTest = () => {
        const unAttemptedQuestions = testData.questions.filter((q, i) => {
            const key = q._id || i;
            return answers[key] === undefined || answers[key] === null;
        });

        if (unAttemptedQuestions.length > 0) {
            toast.error(`Test not completed! ${unAttemptedQuestions.length} questions are still unanswered. Please complete all questions before submitting.`);
            return;
        }

        onFinish(answers);
    };


    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full max-h-[85vh] transform-gpu">
            {/* Main Area */}
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
                    <h2 className="font-black text-slate-800 dark:text-white truncate max-w-md uppercase text-sm tracking-widest">{testData.testTitle}</h2>
                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase">
                        Q. {currentIdx + 1} / {testData.totalQuestions}
                    </span>
                </div>

                <div className="flex-1 p-8 sm:p-12 overflow-y-auto custom-scroll selection:bg-blue-100">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-10 leading-tight">
                            {currentQuestion.qText}
                        </p>
                        <div className="grid gap-4">
                            {currentQuestion.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    className={`w-full p-5 rounded-[1.5rem] border-2 text-left font-bold transition-all active:scale-[0.99] flex items-center gap-4 ${
                                        answers[currentQuestion._id || currentIdx] === i
                                        ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/20'
                                        : 'border-slate-100 hover:border-slate-300 dark:border-slate-800'
                                    }`}
                                >
                                    <span className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                                        answers[currentQuestion._id || currentIdx] === i ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                                    }`}>
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-50 dark:border-slate-800 flex justify-between bg-white dark:bg-slate-900">
                    <button
                        disabled={currentIdx === 0}
                        onClick={() => setCurrentIdx(prev => prev - 1)}
                        className="px-6 py-2 font-black text-slate-400 disabled:opacity-0 flex items-center gap-2"
                    >
                        <ChevronLeft size={20} /> PREV
                    </button>

                    {currentIdx === testData.totalQuestions - 1 ? (
                        <button onClick={handleFinishTest} className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-2xl font-black shadow-lg shadow-green-600/20 flex items-center gap-2 transition-all active:scale-95">
                            FINISH TEST <Send size={16} />
                        </button>
                    ) : (
                        <button onClick={() => setCurrentIdx(prev => prev + 1)} className="bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white px-10 py-3 rounded-2xl font-black shadow-xl flex items-center gap-2 transition-all active:scale-95">
                            SAVE & NEXT <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Right Side: Navigation Palette */}
            <div className="w-full lg:w-80 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <Layout size={16} className="text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Question Palette</span>
                </div>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2.5">
                    {testData.questions.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIdx(i)}
                            className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-xs transition-all ${
                                currentIdx === i ? 'ring-2 ring-blue-600 ring-offset-4 dark:ring-offset-slate-900 shadow-lg' : ''
                            } ${
                                answers[q._id || i] !== undefined
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
