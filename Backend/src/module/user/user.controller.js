
import User from '../auth/auth.model.js';

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

        const deletedUser = await User.findOneAndDelete({ 
            _id: id, 
            role: "student" 
        }).select("_id"); 

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        res.status(200).json({ success: true, message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Deletion failed" });
    }
};