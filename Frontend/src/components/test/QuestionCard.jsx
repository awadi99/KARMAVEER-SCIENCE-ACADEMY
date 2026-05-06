import React, { useState, useEffect, memo } from 'react';
import { Trash2 } from 'lucide-react';

const QuestionCard = memo(({ q, idx, onChange, onRemove, onSmartPaste }) => {
    const [localQuestion, setLocalQuestion] = useState(q.question);
    const [localOptions, setLocalOptions] = useState(q.options);

    useEffect(() => {
        setLocalQuestion(q.question);
        setLocalOptions(q.options);
    }, [q.id, q.question, q.options]);

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
                onSmartPaste(q.id, question, options);
            }
        }
    };

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
                            onBlur={() => {
                                if(localQuestion !== q.question) onChange(q.id, 'question', localQuestion);
                            }}
                            onPaste={handlePasteAction}
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
                                    onBlur={() => {
                                        if(localOptions[oIdx] !== q.options[oIdx]) {
                                            onChange(q.id, 'option', localOptions[oIdx], oIdx);
                                        }
                                    }}
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
}, (prev, next) => {
    return prev.q === next.q && prev.idx === next.idx;
});

export default QuestionCard;