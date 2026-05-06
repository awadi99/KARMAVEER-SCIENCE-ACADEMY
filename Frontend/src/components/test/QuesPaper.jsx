import React, { useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Send, Layout } from 'lucide-react';

export default function QuesPaper({ testData, onFinish }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});

    // Optimization: Current question logic ko memoize kiya taaki switch fast ho
    const currentQuestion = useMemo(() => testData.questions[currentIdx], [testData, currentIdx]);

    // Optimization: Prevent unnecessary re-renders on selection
    const handleSelect = useCallback((idx) => {
        setAnswers(prev => ({ ...prev, [currentQuestion._id || currentIdx]: idx }));
    }, [currentQuestion._id, currentIdx]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full max-h-[800px]">

            {/* Main Question Area */}
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="font-black text-slate-800 dark:text-white truncate">{testData.testTitle}</h2>
                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase">
                        Q. {currentIdx + 1} / {testData.totalQuestions}
                    </span>
                </div>

                <div className="flex-1 p-8 sm:p-12 overflow-y-auto">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-10 leading-tight">
                            {currentQuestion.qText}
                        </p>
                        <div className="grid gap-4">
                            {currentQuestion.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    className={`w-full p-5 rounded-[1.5rem] border-2 text-left font-bold transition-all active:scale-[0.99] flex items-center ${answers[currentQuestion._id || currentIdx] === i
                                            ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/20'
                                            : 'border-slate-100 hover:border-slate-200 dark:border-slate-800'
                                        }`}
                                >
                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 text-xs font-black ${answers[currentQuestion._id || currentIdx] === i ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                                        }`}>
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="p-6 border-t border-slate-50 dark:border-slate-800 flex justify-between bg-white dark:bg-slate-900">
                    <button
                        disabled={currentIdx === 0}
                        onClick={() => setCurrentIdx(prev => prev - 1)}
                        className="px-6 py-2 font-black text-slate-400 disabled:opacity-20 flex items-center gap-2"
                    >
                        <ChevronLeft size={20} /> Back
                    </button>

                    {currentIdx === testData.totalQuestions - 1 ? (
                        <button onClick={() => onFinish(answers)} className="bg-green-600 text-white px-10 py-3 rounded-2xl font-black shadow-lg shadow-green-500/20 flex items-center gap-2">
                            Submit <Send size={16} />
                        </button>
                    ) : (
                        <button onClick={() => setCurrentIdx(prev => prev + 1)} className="bg-slate-900 dark:bg-blue-600 text-white px-10 py-3 rounded-2xl font-black shadow-lg flex items-center gap-2">
                            Next <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Right: Question Grid (Palette) */}
            <div className="w-full lg:w-72 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-slate-400">
                    <Layout size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Navigation</span>
                </div>
                <div className="flex flex-wrap lg:grid lg:grid-cols-4 gap-2">
                    {testData.questions.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIdx(i)}
                            className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-xs transition-all ${currentIdx === i ? 'ring-2 ring-blue-600 ring-offset-2' : ''
                                } ${answers[testData.questions[i]._id || i] !== undefined
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