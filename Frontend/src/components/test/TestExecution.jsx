import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTest } from '../../hook/useTest.js';
import QuesPaper from '../test/QuesPaper.jsx';
import { Loader2 } from 'lucide-react';

export default function TestExecution() {
    const { testId } = useParams();
    const navigate = useNavigate();
    const { useQuestions, submitResult } = useTest();

    // 🚀 Fetch Questions (Cached forever during the session)
    const { data: questions, isLoading } = useQuestions(testId);

    const handleFinish = (answersObject) => {
        // Backend ko array format [0, 2, 1...] chahiye
        const formattedAnswers = questions.map((q, i) => answersObject[q._id || i] ?? null);

        submitResult.mutate({
            testId,
            answers: formattedAnswers
        }, {
            onSuccess: () => {
                // Submit success par local storage saaf karo aur dashboard bhejo
                localStorage.removeItem(`prac_${testId}`);
                navigate('/dashboard');
            }
        });
    };

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center bg-[#F1F5F9] dark:bg-[#0B0F1A]">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0B0F1A] p-4 sm:p-10">
            <QuesPaper
                testData={{
                    testId,
                    testTitle: "Official Examination",
                    totalQuestions: questions.length,
                    questions
                }}
                onFinish={handleFinish}
            />
        </div>
    );
}