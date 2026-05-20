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
            redisClient.set(`ans:${testId}`, JSON.stringify(correctAnswers), { ex: 7200 }) 
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
        const studentId = req.user._id; 
        const { subject } = req.query; 

        let query = { standard: Number(standard) };
        if (subject) query.subject = subject;

        
        const [tests, userResults] = await Promise.all([
            Test.find(query)
                .select('testId testTitle subject totalQuestions createdAt')
                .sort({ createdAt: -1 })
                .lean(),
            
            
            Result.find({ studentId })
                .select('testId -_id')
                .lean()
        ]);

        
        const completedTestIdsSet = new Set(userResults.map(r => r.testId));

        
        const testsWithStatus = tests.map(test => ({
            ...test,
            isCompleted: completedTestIdsSet.has(test.testId)
        }));

        res.status(200).json({ 
            success: true, 
            tests: testsWithStatus 
        });

    } catch (error) {
        console.error("Indicator Logic Error:", error);
        res.status(500).json({ success: false, message: "Error fetching tests" });
    }
};




export const submitTest = async (req, res) => {
    try {
        const { testId, answers } = req.body; 
        const studentId = req.user._id.toString();

        
        const cachedKey = await redisClient.get(`ans:${testId}`);
        let correctAns;

        if (!cachedKey) {

            console.log("Loading ...");
            const questions = await Question.find({testId})
            .select('correctIdx')
            .sort({_id:1})
            .lean();

            if (!questions.length) {
                return res.status(404).json({ message: "Test records not found" });
            }
            correctAns = questions.map(q => q.correctIdx);

            await redisClient.set(`ans:${testId}`, JSON.stringify(correctAns), { ex: 7200 });
        }

        else{

            correctAns = JSON.parse(cachedKey);
        }

        let score = 0;
        let attempted = 0;
        let correct = 0;
        let wrong = 0;

        for (let i = 0; i < correctAns.length; i++) {
            // Check for unattempted (null, undefined, or -1)
            if (answers[i] === null || answers[i] === undefined || answers[i] === -1) {
                continue; 
            }

            attempted++;
            if (Number(answers[i]) === Number(correctAns[i])) {
                score++; // +1 mark per correct
                correct++;
            } else {
                wrong++; // 0 marks for wrong
            }
        }

const resultData = {
            score,
            totalMarks: correctAns.length,
            attempted,
            correct,
            wrong,
            unattempted: correctAns.length - attempted,
            percentage: Number(((score / correctAns.length) * 100).toFixed(2)),
            status: (score / correctAns.length) >= 0.33 ? 'Pass' : 'Fail'
        };

        res.status(200).json({ success: true, ...resultData });


        setImmediate(async () => {
            try {
                await Promise.all([
                    redisClient.sAdd(`done:${testId}`, studentId), 
                    redisClient.expire(`done:${testId}`, 7200),
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
                await redisClient.set(`backup:${testId}:${studentId}`, JSON.stringify(answers), { ex: 7200 });
                console.error("DB Write Failed, Backup saved to Redis:", dbErr);
            }
        });

    } catch (error) {
        
        res.status(503).json({ message: "Server Busy, but progress is safe in browser" });
    }
};



export const getAdminStats = async (req, res) => {
    try {
        const { testTitle, standard } = req.query;

        if (!testTitle?.trim()) {
            return res.status(400).json({ 
                success: false, 
                message: "Examination title is required for processing." 
            });
        }

        const stdNum = Number(standard);

        const testRecord = await Test.findOne({
            standard: stdNum,
            testTitle: { $regex: testTitle.trim(), $options: 'i' }
        }).select('testId testTitle').lean();

        if (!testRecord) {
            return res.status(404).json({ 
                success: false, 
                message: "No matching examination record found." 
            });
        }

        const targetId = String(testRecord.testId).trim();

        const presentList = await Result.aggregate([
            { 
                $match: { testId: targetId } 
            },
            {
                $lookup: {
                    from: "users",
                    localField: "studentId",
                    foreignField: "_id",
                    as: "studentDetails"
                }
            },
            { $unwind: "$studentDetails" },
            {
                $project: {
                    _id: 1,
                    score: 1,
                    totalMarks: 1,
                    status: 1,
                    submittedAt: 1,
                    studentId: {
                        _id: "$studentDetails._id",
                        fullName: "$studentDetails.fullName",
                        email: "$studentDetails.email",
                        erpId: "$studentDetails.erpId",
                        profilePic: "$studentDetails.profilePic"
                    }
                }
            },
            { $sort: { submittedAt: -1 } }
        ]);

        const allStudentsInStandard = await User.find({
            standard: stdNum,
            role: 'student'
        }).select('_id erpId fullName email profilePic').lean();

        const presentIdsSet = new Set(presentList.map(r => r.studentId._id.toString()));

        const absentList = allStudentsInStandard.filter(student =>
            !presentIdsSet.has(student._id.toString())
        );

        return res.status(200).json({
            success: true,
            testInfo: { 
                title: testRecord.testTitle, 
                id: testRecord.testId 
            },
            presentList,
            absentList,
            summary: {
                totalStudents: allStudentsInStandard.length,
                presentCount: presentList.length,
                absentCount: absentList.length
            }
        });

    } catch (error) {
        console.error(`[AdminStats_Error]: ${error.message}`);
        return res.status(500).json({ 
            success: false, 
            message: "An internal server error occurred during analytics generation." 
        });
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
        

        await redisClient.set(`q:${testId}`, JSON.stringify(response), { ex: 7200 });

        res.status(200).json(response);
    } catch (error) {
        res.status(503).json({ message: "Server Busy" });
    }
};


