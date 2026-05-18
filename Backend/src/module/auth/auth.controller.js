import { loginService, signupService } from "./auth.service.js";
import { generateToken } from "../../lib/utils.js";
import redisClient from "../../config/redis.js";
import bcrypt from "bcryptjs";
import User from "./auth.model.js";

export const register = async (req, res) => {
    try {
        const user = await signupService(req.body);

        generateToken({
            id: user._id,
            role: user.role,
            erpId: user.erpId
        }, res);

        res.status(201).json({
            _id: user._id,
            erpId: user.erpId,
            fullName: user.fullName,
            email: user.email
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
};


export const login = async (req, res) => {
    try {

        const user = await loginService(req.body);

        generateToken({
            id: user._id,
            role: user.role,
            erpId: user.erpId
        }, res);

        res.json({
            _id: user._id,
            erpId: user.erpId,
            fullName: user.fullName,
            email: user.email,
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


export const resetPasswordDirect = async (req, res) => {
    try {

        const { email, erpId, newPassword } = req.body;

        if (!email || !erpId || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase(),
            erpId: erpId
        }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials. No account found "
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully. "
        });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({
            success: false,
            message: "An internal server error occurred. Please try again later."
        })

    }
}

export const updateAcademicProfile = async (req,res)=>{
    try{

        const { standard, stream } = req.body
        const userId = req.user._id;

        if (standard && ![11, 12].includes(Number(standard))) {
            return res.status(400).json({ success: false, message: "Invalid Standard" });
        }

        if (stream && !["PCM", "PCB", "PCMB"].includes(stream)) {
            return res.status(400).json({ success: false, message: "Invalid Stream" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { standard, stream } },
            { 
                returnDocument: 'after',
                runValidators: true, 
                lean: true 
            }
        ).select("-password"); 

        res.status(200).json({
            success: true,
            message: "Academic profile updated successfully",
            user: updatedUser
        });


    }catch(error){

        console.error("Update Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });


    }
}



export const logout = async (req, res) => {

    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};


export const googleCallback = async (req, res) => {
    try {
        
        generateToken({
            id: req.user._id,
            role: req.user.role,
            erpId: req.user.erpId
        }, res);

        
        const frontendUrl = "http://localhost:5173";
        let targetPath = "/dashboard"; 

        if (req.user.role !== 'admin') {
            
            const isIncomplete = !req.user.standard || !req.user.stream;
            targetPath = isIncomplete ? "/dashboard/profile" : "/dashboard/tests";
        }

        
        res.redirect(`${frontendUrl}${targetPath}`);
    }
    catch (error) {
        console.error("Google Callback Error:", error);
        res.redirect("http://localhost:5173/login?error=auth_failed");
    }
}


export const verifyErpId = async (req, res) => {
    try {
        const { erpId, role } = req.body;

        // Redis se check karo
        const storedRole = await redisClient.get(`auth:${erpId}`);

        if (!storedRole) {
            return res.status(404).json({ message: "ERP ID not found or expired" });
        }

        if (storedRole !== role) {
            return res.status(403).json({ message: "Role mismatch for this ERP ID" });
        }

        // Agar sab sahi hai
        res.status(200).json({ success: true, message: "ERP Verified" });
    } catch (error) {
        res.status(500).json({ message: "Server error during verification" });
    }
};