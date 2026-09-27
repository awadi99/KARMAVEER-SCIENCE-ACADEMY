import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { findUserById } from "../module/auth/auth.repository.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== "production") {
    dotenv.config({
        path: path.resolve(__dirname, "../../.env"),
    });
} else {
    dotenv.config();
}

export const protectRoute = async (req, res, next) => {
    try {
        let token = null;

        // 1. Check Bearer token
        // Frontend can send token stored in localStorage
        const authHeader = req.headers.authorization;

        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // 2. If no Bearer token, check HTTP-only cookie
        if (!token && req.cookies?.jwt) {
            token = req.cookies.jwt;
        }

        // 3. No token
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided",
            });
        }

        // 4. JWT secret
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error(
                "CRITICAL: JWT_SECRET environment variable is missing!"
            );

            return res.status(500).json({
                message: "Server Configuration Error",
            });
        }

        // 5. Verify token
        let decoded;

        try {
            decoded = jwt.verify(token, secret);
        } catch (error) {
            console.error(
                "JWT verification failed:",
                error.message
            );

            return res.status(401).json({
                message: "Unauthorized - Invalid or expired token",
            });
        }

        // 6. Get user ID
        const userId = decoded.id || decoded.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized - Invalid token payload",
            });
        }

        // 7. Find user
        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found!",
            });
        }

        // 8. Attach user to request
        req.user = user;

        // 9. Continue
        next();

    } catch (error) {
        console.error(
            "Error in protectRoute middleware:",
            error
        );

        return res.status(500).json({
            message: "Internal server problem",
        });
    }
};
