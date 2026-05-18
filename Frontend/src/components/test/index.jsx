import React, { useState, useCallback, useMemo } from 'react';
import { GraduationCap, Type } from 'lucide-react';
import { useTest } from '../../hook/useTest.js';
import QuestionCard from './QuestionCard';
import MilestoneHeader from './MilestoneHeader';
import ControlPanel from './ControlPanel';
import { toast } from 'react-toastify';

export default function QuestionCreator({ subject, maxLimit }) {
    const [testTitle, setTestTitle] = useState('');
    const [selectedStandard, setSelectedStandard] = useState('11');
    const [targetSet, setTargetSet] = useState(20); 
    const [questions, setQuestions] = useState([
        { id: Date.now(), question: '', options: ['', '', '', ''], correct: 0 }
    ]);

    const { uploadTest } = useTest();
    const standards = ['11', '12'];
    const currentCount = questions.length;
    
    // Logic: Ab save tabhi hoga jab count exact targetSet (20 ya 50) ke barabar ho
    const canSave = useMemo(() => currentCount === targetSet, [currentCount, targetSet]);
    const nextGoal = targetSet;

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
        // Limit check based on selected toggle (20 or 50)
        if (currentCount < targetSet) {
            setQuestions(prev => [...prev, { id: Date.now(), question: '', options: ['', '', '', ''], correct: 0 }]);
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 50);
        } else {
            toast.error(`You have selected the ${targetSet} question set. The maximum limit has been reached.`)
        }
    }, [currentCount, targetSet]);

    const removeQuestion = useCallback((id) => {
        if (questions.length > 1) {
            setQuestions(prev => prev.filter(q => q.id !== id));
        }
    }, [questions.length]);

    const handleSubmit = async () => {
        if (!testTitle.trim() || testTitle.trim().length < 3) {
            toast.error("Please enter a valid Test Title.");
            return;
        }
        if (!canSave) {
            toast.error(`Incomplete Set: Please add ${targetSet - currentCount} more questions.`);
            return;
        }
        const isFormIncomplete = questions.some(q => !q.question.trim() || q.options.some(opt => !opt.trim()));
        if (isFormIncomplete) {
            toast.error("Please fill all questions and options.");
            return;
        }

        const payload = {
            testTitle: testTitle.trim(),
            subject: subject,
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
             {/* Test Title */}
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

            {/* Class Selection */}
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

            {/* Passing toggle state to Header */}
            <MilestoneHeader 
                subject={subject} 
                selectedStandard={selectedStandard} 
                canSave={canSave} 
                nextGoal={nextGoal} 
                currentCount={currentCount} 
                targetSet={targetSet}        // New Prop
                setTargetSet={setTargetSet}  // New Prop
            />

            <div className="space-y-12 sm:space-y-16">
                {questions.map((q, idx) => (
                    <QuestionCard 
                        key={q.id} 
                        q={q} 
                        idx={idx} 
                        onChange={handleInputChange} 
                        onRemove={removeQuestion} 
                        onSmartPaste={handleSmartPaste}
                    />
                ))}
            </div>

            <ControlPanel 
                onAdd={addQuestion} 
                onPublish={handleSubmit} 
                currentCount={currentCount} 
                maxLimit={targetSet} 
                isPending={uploadTest.isPending} 
                canSave={canSave} 
                nextGoal={nextGoal} 
            />
        </div>
    );
}