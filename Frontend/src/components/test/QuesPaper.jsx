import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, Layout, ListChecks } from 'lucide-react';
import { toast } from 'react-toastify';

export default function QuesPaper({ testData, onFinish }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [showPalette, setShowPalette] = useState(false);

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
        const unAttemptedCount = testData.questions.filter((q, i) => answers[q._id || i] === undefined).length;
        if (unAttemptedCount > 0) {
            toast.error(`Complete all ${unAttemptedCount} remaining questions!`);
            return;
        }
        onFinish(answers);
    };

    return (
        // Main Background - Deep Navy
        <div className="flex flex-col lg:flex-row gap-4 h-[90vh] overflow-hidden p-2 sm:p-4 bg-[#0a0f1d]">
            
            {/* Main Question Area */}
            <div className="flex-1 flex flex-col bg-[#111827] rounded-[2rem] border border-[#1f2937] shadow-lg overflow-hidden">
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#1f2937] flex justify-between items-center bg-[#0f172a]/50">
                    <h2 className="font-bold text-white text-[10px] tracking-[0.2em] uppercase truncate">
                        {testData.testTitle}
                    </h2>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setShowPalette(!showPalette)} className="lg:hidden p-2 bg-[#1f2937] text-white rounded-xl">
                            <ListChecks size={16} />
                        </button>
                        <span className="bg-[#2563eb] text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider">
                            Q. {currentIdx + 1}/{testData.totalQuestions}
                        </span>
                    </div>
                </div>

                {/* Question Content */}
                <div className="flex-1 p-8 sm:p-12 overflow-y-auto">
                    <p className="text-xl sm:text-2xl font-bold text-white mb-10 leading-tight">
                        {currentQuestion.qText}
                    </p>
                    <div className="grid gap-4">
                        {currentQuestion.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(i)}
                                className={`w-full p-5 rounded-[1.5rem] border-2 text-left font-bold transition-all flex items-center gap-4 ${
                                    answers[currentQuestion._id || currentIdx] === i
                                    ? 'border-[#2563eb] bg-[#1e293b] text-[#60a5fa]'
                                    : 'border-[#1f2937] hover:border-[#374151] text-white'
                                }`}
                            >
                                <span className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-black ${
                                    answers[currentQuestion._id || currentIdx] === i ? 'bg-[#2563eb] text-white' : 'bg-[#1f2937] text-white'
                                }`}>
                                    {String.fromCharCode(65 + i)}
                                </span>
                                <span className="text-base">{opt}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-6 border-t border-[#1f2937] flex justify-between items-center bg-[#0f172a]">
                    <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(p => p - 1)} className="text-[10px] font-black text-slate-500 disabled:opacity-0 flex items-center gap-2">
                        <ChevronLeft size={18} /> PREV
                    </button>
                    {currentIdx === testData.totalQuestions - 1 ? (
                        <button onClick={handleFinishTest} className="bg-[#059669] hover:bg-[#047857] text-white px-8 py-3 rounded-2xl font-black text-xs shadow-lg transition-all active:scale-95">
                            FINISH TEST
                        </button>
                    ) : (
                        <button onClick={() => setCurrentIdx(p => p + 1)} className="bg-[#1f2937] hover:bg-[#374151] text-white px-8 py-3 rounded-2xl font-black text-xs transition-all active:scale-95">
                            NEXT <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Question Palette */}
            <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-[#111827] border-l border-[#1f2937] shadow-2xl p-8 transition-transform lg:static lg:transform-none ${showPalette ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3 text-white"><Layout size={18} /> <span className="text-[10px] font-black uppercase tracking-[0.2em]">Palette</span></div>
                    <button className="lg:hidden text-white" onClick={() => setShowPalette(false)}>✕</button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                    {testData.questions.map((q, i) => (
                        <button key={i} onClick={() => { setCurrentIdx(i); setShowPalette(false); }} className={`h-11 w-11 rounded-xl text-xs font-black transition-all ${
                            currentIdx === i ? 'ring-2 ring-white' : ''
                        } ${answers[q._id || i] !== undefined ? 'bg-[#2563eb] text-white' : 'bg-[#1f2937] text-slate-400'}`}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}