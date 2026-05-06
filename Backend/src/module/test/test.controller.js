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

        // 🚀 FIXED: Upstash/Modern Redis compatible syntax
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

export const submitTest = async (req, res) => {
    try {
        const { testId, answers } = req.body;
        const studentId = req.user._id.toString();

        const cachedAns = await redisClient.get(`ans:${testId}`);
        if (!cachedAns) return res.status(404).json({ message: "Test not found" });
        
        const correctAns = typeof cachedAns === 'string' ? JSON.parse(cachedAns) : cachedAns;

        let score = 0;
        for (let i = 0; i < correctAns.length; i++) {
            if (Number(answers[i]) === Number(correctAns[i])) score++;
        }
        const status = (score / correctAns.length) >= 0.33 ? 'Pass' : 'Fail';

        // Background Task
        Promise.all([
            redisClient.sadd(`done:${testId}`, studentId),
            Result.findOneAndUpdate(
                { testId, studentId },
                { score, totalMarks: correctAns.length, status, standard: req.user.standard },
                { upsert: true, lean: true }
            ).exec()
        ]).catch(err => console.error("Sync Error:", err));

        res.status(200).json({ success: true, score, status });
    } catch (error) {
        res.status(503).json({ message: "Server Busy" });
    }
};

export const getAdminStats = async (req, res) => {
    try {
        const { testId, standard } = req.query;
        const attemptedIds = await redisClient.smembers(`done:${testId}`);

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