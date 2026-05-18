import express from "express";
import passport from "passport";
import rateLimit from 'express-rate-limit';
import {
    register,
    login,
    logout,
    googleCallback,
    verifyErpId,
    resetPasswordDirect,
    updateAcademicProfile

} from "./auth.controller.js";
import { signupSchema, loginSchema } from "../../validators/auth.vaildator.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/register", validate(signupSchema), register);
router.post("/login", validate(loginSchema), login);
router.patch("/update-profile" ,protect, updateAcademicProfile)
router.post("/reset-password", resetPasswordDirect);
router.post("/logout", logout);

// Auth Test Route
router.get("/me", protect, (req, res) => {
    res.json(req.user);
});


const verifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many attempts, please try again later."
});
router.post("/verify-erp", verifyLimiter, verifyErpId);

// 1. Google Auth Initiation
router.get("/google", (req, res, next) => {
    const { erpId, role } = req.query;

    // Passport options object
    const passportOptions = {
        scope: ["profile", "email"],
        prompt: 'select_account'
    };


    if (erpId) {
        passportOptions.state = JSON.stringify({ erpId, role });
    }


    passport.authenticate("google", passportOptions)(req, res, next);
});

// 2. Google OAuth Callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        // Backend failure redirect (Frontend full URL behtar rehta hai)
        failureRedirect: "https://karmaveer-science-academy-53pt.vercel.app/login?error=auth_failed"
    }),
    googleCallback
);

export default router;