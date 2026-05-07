import { Test, Question, Result } from './test.model.js';
import User from '../auth/auth.model.js';
import redisClient from '../../config/redis.js';

export const uploadQuestionSet = async (req, res) => {
    try {
        const { testTitle, subject, standard, questions } = req.body;
        const testId = `T-${Date.now()}`;
        const stdNum = Number(standard);

        const correctAnswers = [];
        const cleanQuestions = questions.map(q => {
            const correct = Number(q.correct);
            correctAnswers.push(correct);
            return {
                testId,
                qText: q.question.trim(),
                options: q.options,
                correctIdx: correct
            };
        });

        await Promise.all([
            Test.create({ testId, testTitle, subject, standard: stdNum, totalQuestions: questions.length }),
            Question.insertMany(cleanQuestions, { ordered: false }),
            redisClient.set(`ans:${testId}`, JSON.stringify(correctAnswers), { ex: 86400 }) 
        ]);

        res.status(201).json({ success: true, testId });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};


export const getTestsForStudent = async (req, res) => {
    try {
        const { standard } = req.user; 
        const studentId = req.user._id.toString(); 
        const { subject } = req.query; 

        let query = { standard: Number(standard) };
        if (subject) query.subject = subject;

        const tests = await Test.find(query)
            .select('testId testTitle subject totalQuestions createdAt')
            .sort({ createdAt: -1 })
            .lean();

        
        const testsWithStatus = await Promise.all(tests.map(async (test) => {
            const isCompleted = await redisClient.sIsMember(`done:${test.testId}`, studentId);
            return { 
                ...test, 
                isCompleted: !!isCompleted // Ye frontend ko batayega ki indicator dikhana hai
            };
        }));

        res.status(200).json({ 
            success: true, 
            tests: testsWithStatus 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching tests" });
    }
};
export const submitTest = async (req, res) => {
    try {
        const { testId, answers, type } = req.body; 
        const studentId = req.user._id.toString();

        
        // const hasSubmitted = await redisClient.sIsMember(`done:${testId}`, studentId);
        // if (hasSubmitted) return res.status(400).json({ message: "Submission already recorded" });


        const cachedKey = await redisClient.get(`ans:${testId}`);
        if (!cachedKey) return res.status(404).json({ message: "Test key expired" });
        const correctAns = JSON.parse(cachedKey);

        let score = 0;
        for (let i = 0; i < correctAns.length; i++) {
            if (Number(answers[i]) === Number(correctAns[i])) score++;
        }

        const resultData = {
            score,
            totalMarks: correctAns.length,
            status: (score / correctAns.length) >= 0.33 ? 'Pass' : 'Fail'
        };


        res.status(200).json({ success: true, ...resultData });


        setImmediate(async () => {
            try {
                await Promise.all([
                    redisClient.sAdd(`done:${testId}`, studentId), 
                    Result.findOneAndUpdate(
                        { testId, studentId },
                        { 
                            ...resultData, 
                            studentAnswers: answers,
                            standard: req.user.standard 
                        },
                        { upsert: true, lean: true }
                    )
                ]);
            } catch (dbErr) {
                await redisClient.set(`backup:${testId}:${studentId}`, JSON.stringify(answers), { ex: 86400 });
                console.error("DB Write Failed, Backup saved to Redis:", dbErr);
            }
        });

    } catch (error) {
        
        res.status(503).json({ message: "Server Busy, but progress is safe in browser" });
    }
};

export const getAdminStats = async (req, res) => {
    try {
        const { testId, standard } = req.query;
        const attemptedIds = await redisClient.sMembers(`done:${testId}`);

        const [allStudents, testResults] = await Promise.all([
            User.find({ standard: Number(standard), role: 'student' }).select('_id fullName email').lean(),
            Result.find({ testId }).select('studentId score status').lean()
        ]);

        const attemptedSet = new Set(attemptedIds);
        const absentList = allStudents.filter(s => !attemptedSet.has(s._id.toString()));

        res.status(200).json({
            stats: { total: allStudents.length, attended: testResults.length, absent: absentList.length },
            absentList,
            resultList: testResults
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getPracticeQuestions = async (req, res) => {
    try {
        const { testId } = req.params;

        // 1. Redis check first (RAM speed)
        const cached = await redisClient.get(`q:${testId}`);
        if (cached) return res.status(200).json(JSON.parse(cached));

        // 2. DB Query (Optimized)
        const questions = await Question.find({ testId })
            .select('qText options -_id')
            .lean();

        if (!questions.length) return res.status(404).json({ message: "Test not found" });

        const response = { success: true, questions };
        

        await redisClient.set(`q:${testId}`, JSON.stringify(response), { ex: 86400 });

        res.status(200).json(response);
    } catch (error) {
        res.status(503).json({ message: "Server Busy" });
    }
};


