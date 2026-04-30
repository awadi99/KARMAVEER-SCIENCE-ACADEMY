import React, { useState, useCallback, memo, useMemo } from 'react';
import { Plus, Trash2, Save, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

// ... QuestionCard remains the same ...
const QuestionCard = memo(({ q, idx, onChange, onRemove }) => {
    return (
        <section className="group relative animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div className="absolute -left-3 sm:-left-5 top-8 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white shadow-lg dark:bg-blue-600 sm:h-10 sm:w-10 sm:text-sm">
                {idx + 1}
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 sm:p-10">
                <div className="flex flex-col gap-8">
                    <div className="relative">
                        <textarea
                            value={q.question}
                            onChange={(e) => onChange(q.id, 'question', e.target.value)}
                            placeholder="Enter your question here..."
                            className="peer w-full resize-none border-b-2 border-slate-100 bg-transparent pb-4 text-lg font-bold text-slate-800 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:text-slate-100 sm:text-2xl"
                            rows="1"
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                        />
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 peer-focus:w-full" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
                        {q.options.map((opt, oIdx) => (
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
                                    onChange={(e) => onChange(q.id, 'option', e.target.value, oIdx)} 
                                    placeholder={`Option ${oIdx + 1}`} 
                                    className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-300" 
                                />
                                {q.correct === oIdx && <CheckCircle2 size={16} className="absolute right-4 text-blue-600" />}
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
});

export default function QuestionCreator({ subject, maxLimit }) {
    const [questions, setQuestions] = useState([
        { id: Date.now(), question: '', options: ['', '', '', ''], correct: 0 }
    ]);

    // Define strict milestones
    const MILESTONES = [20, 50];

    const currentCount = questions.length;

    // RULE: Button is enabled ONLY if the count is exactly 20 or exactly 50
    const canSave = useMemo(() => MILESTONES.includes(currentCount), [currentCount]);

    // Determine what the user is currently aiming for to display in the UI
    const nextGoal = useMemo(() => {
        if (currentCount < 20) return 20;
        if (currentCount > 20 && currentCount < 50) return 50;
        return null;
    }, [currentCount]);

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
            setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
        }
    }, [currentCount, maxLimit]);

    const removeQuestion = useCallback((id) => {
        if (questions.length > 1) {
            setQuestions(prev => prev.filter(q => q.id !== id));
        }
    }, [questions.length]);

    const handleSubmit = async () => {
        if (!canSave) return;
        const payload = { subject, limit: maxLimit, questions };
        console.log("Saving Test Data...", payload);
        alert(`Test for ${subject} with ${currentCount} questions saved!`);
    };

    return (
        <div className="relative mx-auto max-w-4xl px-2 pb-40">
            {/* Stats Header */}
            <div className="mb-8 flex items-center justify-between rounded-3xl bg-blue-600 p-4 text-white shadow-xl shadow-blue-500/20 sm:p-6">
                <div>
                    <h2 className="text-lg font-black sm:text-xl">{subject} Test</h2>
                    <p className="text-[10px] font-bold uppercase opacity-80">
                        {canSave 
                            ? "Milestone Hit! Ready to Save" 
                            : `Current: ${currentCount} | Goal: ${nextGoal}`}
                    </p>
                </div>
                <div className="h-12 w-12 rounded-full border-4 border-white/20 flex items-center justify-center text-xs font-black">
                    {currentCount}
                </div>
            </div>

            {/* Questions List */}
            <div className="space-y-12 sm:space-y-16">
                {questions.map((q, idx) => (
                    <QuestionCard 
                        key={q.id} 
                        q={q} 
                        idx={idx} 
                        onChange={handleInputChange} 
                        onRemove={removeQuestion} 
                    />
                ))}
            </div>

            {/* Dynamic Alerts */}
            <div className="mt-10 space-y-4">
                {!canSave && (
                    <div className="flex items-center justify-center gap-2 rounded-3xl border border-blue-200 bg-blue-50 p-4 text-blue-700 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-400">
                        <AlertCircle size={20} />
                        <span className="text-sm font-bold">
                            {currentCount < 20 
                                ? `Finish 20 questions to enable Save.` 
                                : `You've passed 20. You must now reach exactly 50 to enable Save.`}
                        </span>
                    </div>
                )}
            </div>

            {/* PREMIUM FLOATING DOCK */}
            <div className="fixed bottom-6 left-1/2 z-[100] w-[95%] -translate-x-1/2 max-w-xl">
                <div className="flex items-center gap-3 rounded-[3rem] border border-slate-200 bg-white/70 p-3 shadow-2xl backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-900/80">
                    <button 
                        onClick={addQuestion} 
                        disabled={currentCount >= maxLimit}
                        className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 disabled:opacity-20 dark:bg-slate-800 dark:text-slate-300"
                    >
                        <Plus size={24} className="transition-transform group-active:scale-75" />
                    </button>
                    
                    <button 
                        onClick={handleSubmit}
                        disabled={!canSave}
                        className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-full font-black text-white shadow-lg transition-all duration-300 active:scale-[0.98]
                            ${!canSave 
                                ? "bg-slate-300 cursor-not-allowed opacity-50 shadow-none text-slate-500 dark:bg-slate-800" 
                                : "bg-green-600 hover:bg-green-700 shadow-green-500/40 hover:shadow-green-500/60"
                            }`}
                    >
                        {!canSave ? <Lock size={18} /> : <CheckCircle2 size={20} />}
                        <span className="text-sm uppercase tracking-wider">
                            {canSave ? "Save Exam" : `Add ${nextGoal - currentCount} more`}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}