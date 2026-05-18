import jwt from 'jsonwebtoken';
import path from 'path';
import { findUserById } from '../module/auth/auth.repository.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🎯 FIXED HERE: Local par file path dhoodhega, cloud par automatic default inject access lega
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.resolve(__dirname, "../../.env") });
} else {
    dotenv.config(); // Render production dashboard variable system hook
}

export const protect = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Not authorized - No Token" });
    }

    try {
        // Safe check block if secret configuration is missing in deployment
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("CRITICAL: JWT_SECRET environment variable is missing on server!");
            return res.status(500).json({ message: "Server Configuration Error" });
        }

        const decode = jwt.verify(token, secret);

        const userId = decode.id || decode.userId;
        if (!userId) {
            return res.status(401).json({ message: "Invalid Token Payload" });
        }

        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error Context:", error.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Access Denied: Admins Only" });
    }
};

