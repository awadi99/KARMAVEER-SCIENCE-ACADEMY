import jwt from 'jsonwebtoken';
import path from 'path';
import { findUserById } from '../module/auth/auth.repository.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.resolve(__dirname, "../../.env") });
} else {
    dotenv.config();
}

export const protect = async (req, res, next) => {

    // ✅ NEW: Check Bearer token first (Google OAuth), then fallback to cookie (normal login)
    let token = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token && req.cookies?.jwt) {
        token = req.cookies.jwt;
    }
    // ✅ END NEW

    if (!token) {
        return res.status(401).json({ message: "Not authorized - No Token" });
    }

    try {
        // ✅ EXISTING: Safe check block if secret configuration is missing in deployment
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("CRITICAL: JWT_SECRET environment variable is missing on server!");
            return res.status(500).json({ message: "Server Configuration Error" });
        }

        const decode = jwt.verify(token, secret);

        // ✅ EXISTING: userId extraction
        const userId = decode.id || decode.userId;
        if (!userId) {
            return res.status(401).json({ message: "Invalid Token Payload" });
        }

        // ✅ EXISTING: DB lookup
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        // ✅ EXISTING: Error logging
        console.error("JWT Verification Error Context:", error.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

// ✅ EXISTING: Unchanged
export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role.toLowerCase() === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Access Denied: Admins Only" });
    }
};