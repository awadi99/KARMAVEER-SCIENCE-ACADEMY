
import User from '../auth/auth.model.js';
import { Result,Test } from '../test/test.model.js';



export const getAdminStudentList = async (req, res) => {
    try {
        const { search, standard, stream, page = 1, limit = 50 } = req.query;


        let query = { role: "student" };

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: "i" } },
                { erpId: { $regex: search, $options: "i" } }
            ];
        }

        if (standard && standard !== "All") query.standard = Number(standard);
        if (stream && stream !== "All") query.stream = stream;

        // Lean query with projection for 3x faster response
        const students = await User.find(query)
            .select("fullName email erpId standard stream createdAt")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .lean(); 

        const total = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            count: students.length,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            students
        });
    } catch (error) {
        console.error("Fetch Students Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // 2. Cascade Delete: 
        // User ko delete karo AND uski saari 'Result' entries jahan studentId == id hai
        await Promise.all([
            User.findByIdAndDelete(id),
            Result.deleteMany({ studentId: id }) 
        ]);

        res.status(200).json({ 
            success: true, 
            message: "Student and all their test records deleted" 
        });

    } catch (error) {
        console.error("Deletion Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export const getDashboardSummary = async (req, res) => {
    try {
        const { standard } = req.query; 
        const std = Number(standard) || 11;

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const [totalStudents, totalTests, todayAttendance, weeklyData] = await Promise.all([
            User.countDocuments({ role: "student", standard: std }),
            Test.countDocuments({ standard: std }),
            Result.countDocuments({ 
                standard: std, 
                createdAt: { $gte: startOfToday } 
            }),
            Result.aggregate([
                { $match: { standard: std, createdAt: { $gte: sevenDaysAgo } } },
                {
                    $group: {
                        _id: { $dayOfWeek: "$createdAt" }, 
                        tests: { $sum: 1 }
                    }
                },
                { $sort: { "_id": 1 } }
            ])
        ]);

        // Mapping 1(Sun) to 7(Sat) to names
        const dayMap = { 1: "Sun", 2: "Mon", 3: "Tue", 4: "Wed", 5: "Thu", 6: "Fri", 7: "Sat" };
        const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const weeklyActivity = daysOrder.map(day => {
            const dayIndex = Object.keys(dayMap).find(key => dayMap[key] === day);
            const found = weeklyData.find(item => item._id == dayIndex);
            return { day, tests: found ? found.tests : 0 };
        });

        res.status(200).json({ success: true, data: { totalStudents, totalTests, todayAttendance, weeklyActivity } });
    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};