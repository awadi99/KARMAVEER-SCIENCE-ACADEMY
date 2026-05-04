import React, { useState, useCallback, memo, useMemo, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Lock, GraduationCap, Type } from 'lucide-react';
import { useTest } from '../../hook/useTest.js';

// --- QuestionCard Component (Memoized) ---
const QuestionCard = memo(({ q, idx, onChange, onRemove, onSmartPaste }) => {
    const [localQuestion, setLocalQuestion] = useState(q.question);
    const [localOptions, setLocalOptions] = useState(q.options);

    useEffect(() => {
        setLocalQuestion(q.question);
        setLocalOptions(q.options);
    }, [q.question, q.options]);

    // --- REZEX LOGIC START ---
    const handlePasteAction = (e) => {
        const pastedText = e.clipboardData.getData('text').trim();
        const splitPattern = /(?:\n|^)\s*(?:[\(\[]?[A-D1-4][\)\].\s-])/g;
        
        if (pastedText.match(splitPattern)) {
            e.preventDefault();
            const parts = pastedText.split(splitPattern).map(p => p.trim()).filter(Boolean);

            if (parts.length >= 2) {
                const question = parts[0];
                const options = parts.slice(1, 5);
                while (options.length < 4) options.push('');
                
                // Parent ko update karne ke liye naya function
                onSmartPaste(q.id, question, options);
            }
        }
    };
    // --- REZEX LOGIC END ---

    return (
        <section className="group relative animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div className="absolute -left-3 sm:-left-5 top-8 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white shadow-lg dark:bg-blue-600 sm:h-10 sm:w-10 sm:text-sm">
                {idx + 1}
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 sm:p-10">
                <div className="flex flex-col gap-8">
                    <div className="relative">
                        <textarea
                            value={localQuestion}
                            onChange={(e) => setLocalQuestion(e.target.value)}
                            onBlur={() => onChange(q.id, 'question', localQuestion)}
                            onPaste={handlePasteAction} // Paste event yahan add kiya
                            placeholder="Enter your question here..."
                            className="peer w-full resize-none border-b-2 border-slate-100 bg-transparent pb-4 text-lg font-bold text-slate-800 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:text-slate-100 sm:text-2xl"
                            rows="1"
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
                        {localOptions.map((opt, oIdx) => (
                            <label 
                                key={oIdx} 
                                className={`relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all active:scale-[0.98] ${
                                    q.correct === oIdx 
                                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-500/10' 
                                    : 'border-slate-50 bg-slate-50/50 hover:border-slate-200 dark:border-transparent dark:bg-slate-800/40'
                                }`}
                            >
                                <input 
                                    type="radio" 
                                    name={`correct-${q.id}`}
                                    checked={q.correct === oIdx} 
                                    onChange={() => onChange(q.id, 'correct', oIdx)} 
                                    className="sr-only" 
                                />
                                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                                    q.correct === oIdx ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                                }`}>
                                    {q.correct === oIdx && <div className="h-2 w-2 rounded-full bg-white" />}
                                </div>
                                <input 
                                    type="text" 
                                    value={opt} 
                                    onChange={(e) => {
                                        const newOpts = [...localOptions];
                                        newOpts[oIdx] = e.target.value;
                                        setLocalOptions(newOpts);
                                    }}
                                    onBlur={() => onChange(q.id, 'option', localOptions[oIdx], oIdx)}
                                    placeholder={`Option ${oIdx + 1}`} 
                                    className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-300 sm:text-base" 
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={() => onRemove(q.id)} 
                    className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-all hover:bg-red-50 hover:text-red-500 dark:border-slate-700 dark:bg-slate-800 sm:opacity-0 sm:group-hover:opacity-100"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </section>
    );
}, (prev, next) => prev.q === next.q && prev.idx === next.idx);

// --- Main QuestionCreator Component ---
export default function QuestionCreator({ subject, maxLimit }) {
    const [testTitle, setTestTitle] = useState('');
    const [selectedStandard, setSelectedStandard] = useState('11');
    const [questions, setQuestions] = useState([
        { id: Date.now(), question: '', options: ['', '', '', ''], correct: 0 }
    ]);

    const { uploadTest } = useTest();

    const MILESTONES = [20, 50];
    const standards = ['11', '12'];
    const currentCount = questions.length;
    
    const canSave = useMemo(() => MILESTONES.includes(currentCount), [currentCount]);

    const nextGoal = useMemo(() => {
        if (currentCount < 20) return 20;
        if (currentCount < 50) return 50;
        return null;
    }, [currentCount]);

    // Paste handler for parent state
    const handleSmartPaste = useCallback((qId, question, options) => {
        setQuestions(prev => prev.map(q => 
            q.id === qId ? { ...q, question, options } : q
        ));
    }, []);

    const handleInputChange = useCallback((qId, field, value, optIdx = null) => {
        setQuestions(prev => prev.map(q => {
            if (q.id !== qId) return q;
            if (field === 'option') {
                const newOptions = [...q.options];
                newOptions[optIdx] = value;
                return { ...q, options: newOptions };
            }
            return { ...q, [field]: value };
        }));
    }, []);

    const addQuestion = useCallback(() => {
        if (currentCount < maxLimit) {
            setQuestions(prev => [...prev, { id: Date.now(), question: '', options: ['', '', '', ''], correct: 0 }]);
            requestAnimationFrame(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [currentCount, maxLimit]);

    const removeQuestion = useCallback((id) => {
        if (questions.length > 1) {
            setQuestions(prev => prev.filter(q => q.id !== id));
        }
    }, [questions.length]);

    const handleSubmit = async () => {
        if (!testTitle.trim() || testTitle.trim().length < 3) {
            alert("Please enter a valid Test Title.");
            return;
        }

        if (!canSave) {
            alert(`Incomplete Milestone: Need ${nextGoal} questions.`);
            return;
        }

        const isFormIncomplete = questions.some(q => 
            !q.question.trim() || q.options.some(opt => !opt.trim())
        );

        if (isFormIncomplete) {
            alert("Please fill all questions and options.");
            return;
        }

        const payload = {
            testTitle: testTitle.trim(),
            subject,
            standard: selectedStandard,
            totalQuestions: questions.length,
            questions: questions.map(({ id, ...rest }) => rest),
            createdAt: new Date().toISOString()
        };

        uploadTest.mutate(payload, {
            onSuccess: () => {
                setTestTitle('');
                setQuestions([{ id: Date.now(), question: '', options: ['', '', '', ''], correct: 0 }]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    };

    return (
        <div className="relative mx-auto max-w-4xl px-4 pb-40 pt-10">
            <div className="mb-8 flex flex-col gap-2 px-4">
                <div className="flex items-center gap-2 text-slate-500">
                    <Type size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Test Title</span>
                </div>
                <input 
                    type="text"
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    placeholder="Enter Paper Name..."
                    className="w-full border-b-2 border-slate-100 bg-transparent py-2 text-2xl font-black text-slate-800 outline-none focus:border-blue-500 dark:border-slate-800 dark:text-white"
                />
            </div>

            <div className="mb-10 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <GraduationCap size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Select Target Class</span>
                </div>
                <div className="flex gap-4 p-2 bg-slate-100/50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                    {standards.map((std) => (
                        <button
                            key={std}
                            onClick={() => setSelectedStandard(std)}
                            className={`group relative flex h-14 w-28 sm:w-32 items-center justify-center rounded-[1.5rem] border-2 font-black transition-all active:scale-95 ${
                                selectedStandard === std 
                                ? 'border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-500/40' 
                                : 'border-transparent bg-white text-slate-400 dark:bg-slate-900 hover:border-slate-300'
                            }`}
                        >
                            <span className="text-sm sm:text-base tracking-tight">CLASS {std}</span>
                        </button>
                    ))}
                </div>
            </div>

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

            <div className="space-y-12 sm:space-y-16">
                {questions.map((q, idx) => (
                    <QuestionCard 
                        key={q.id} 
                        q={q} 
                        idx={idx} 
                        onChange={handleInputChange} 
                        onRemove={removeQuestion} 
                        onSmartPaste={handleSmartPaste} // Prop pass kiya
                    />
                ))}
            </div>

            <div className="fixed bottom-8 left-1/2 z-[100] w-[95%] -translate-x-1/2 max-w-xl">
                <div className="flex items-center gap-3 rounded-[2.5rem] border border-slate-200/50 bg-white/80 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:border-slate-800/50 dark:bg-slate-900/90">
                    <button 
                        onClick={addQuestion} 
                        disabled={currentCount >= maxLimit || uploadTest.isPending} 
                        className="group flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-blue-600 hover:text-white disabled:opacity-20 dark:bg-slate-800 dark:text-slate-300"
                    >
                        <Plus size={24} className="transition-transform group-hover:rotate-90" />
                    </button>
                    
                    <button 
                        onClick={handleSubmit}
                        disabled={!canSave || uploadTest.isPending}
                        className={`flex h-12 sm:h-14 flex-1 items-center justify-center gap-3 rounded-full font-black text-white shadow-lg transition-all duration-500 ${
                            !canSave || uploadTest.isPending 
                            ? "bg-slate-300 dark:bg-slate-800 cursor-not-allowed grayscale" 
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/50 hover:scale-[1.02]"
                        }`}
                    >
                        {uploadTest.isPending ? (
                            <span className="animate-pulse">Publishing...</span>
                        ) : (
                            <>
                                {!canSave ? <Lock size={18} /> : <CheckCircle2 size={20} />}
                                <span className="text-[10px] sm:text-xs uppercase tracking-widest">
                                    {canSave ? "Publish to Students" : `Add ${nextGoal - currentCount} More`}
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}