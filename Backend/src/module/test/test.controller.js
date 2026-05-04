import User from "../auth/auth.model.js";
import { Question} from "../test/test.model.js";
import { Result } from "./test.result.model.js";

export const uploadQuestionSet = async (req, res) => {
    try {
        const { testTitle, subject, standard, questions } = req.body;

        // Validation
        const count = questions?.length || 0;
        if (count !== 20 && count !== 50) {
            return res.status(400).json({ message: `Only 20 or 50 questions allowed. Got: ${count}` });
        }

        // Generating missing fields manually if frontend isn't sending them
        const generatedTestId = `TEST-${Date.now()}`;
        const finalDate = new Date(); // Using current date if testDate is invalid

        const cleanData = questions.map(q => ({
            testId: generatedTestId, 
            testTitle: testTitle || "Untitled Test", 
            testDate: finalDate,
            standard: Number(standard) || 0,
            subject: subject || "General",
            qText: q.question ? q.question.trim() : "Empty Question", 
            options: q.options || ["", "", "", ""],
            correctIdx: Number(q.correct) || 0, 
            marks: 1
        }));

        await Question.insertMany(cleanData, { ordered: true });
        
        res.status(201).json({ 
            success: true, 
            message: `Set of ${count} uploaded successfully.`,
            testId: generatedTestId 
        });

    } catch (error) {
        console.error("Detailed Upload Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Database Validation Failed", 
            error: error.message 
        });
    }
};
export const getAdminStats = async (req, res) => {
    try {
        const { testId, standard } = req.query;

        // Parallel processing for performance
        const [allStudents, testResults] = await Promise.all([
            User.find({ standard, role: 'student' }).select('_id fullName email').lean(),
            Result.find({ testId, standard }).select('studentId score totalMarks status').lean()
        ]);

        const attendedIds = new Set(testResults.map(r => r.studentId.toString()));

        // Fast filtering
        const absentList = allStudents.filter(s => !attendedIds.has(s._id.toString()));
        const failedList = testResults.filter(r => r.status === 'Fail');

        res.json({
            stats: {
                total: allStudents.length,
                present: attendedIds.size,
                absent: absentList.length,
                failed: failedList.length
            },
            absentList,
            failedList
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSchedules = async (req, res) => {
    try {
        const schedules = await Test.find()
            .sort({ createdAt: -1 })
            .select('title subject standard totalQuestions createdAt');

        if (!schedules || schedules.length === 0) {
            return res.status(200).json({
                success: true,
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            data: schedules
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// 3. SUBMIT TEST (Calculates Pass/Fail instantly)
export const submitTest = async (req, res) => {
    try {
        const { testId, answers } = req.body; // answers: [{qId, selectedIdx}]
        const studentId = req.user._id;

        // Fetch correct answers (Projection used for speed)
        const questions = await Question.find({ testId }).select('correctIdx').lean();
        
        let score = 0;
        questions.forEach((q, index) => {
            if (answers[index]?.selectedIdx === q.correctIdx) score++;
        });

        const totalMarks = questions.length;
        const status = (score / totalMarks) >= 0.33 ? 'Pass' : 'Fail';

        const result = await Result.findOneAndUpdate(
            { testId, studentId },
            { score, totalMarks, status, standard: req.user.standard },
            { upsert: true, new: true }
        );

        res.json({ success: true, score, status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};