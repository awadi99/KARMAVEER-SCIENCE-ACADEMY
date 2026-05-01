import express from "express";
import { register, login, logout, googleCallback } from "./auth.controller.js";
import { signupSchema, loginSchema } from "../../validators/auth.vaildator.js";
import { validate } from "../../middlewares/validate.middleware.js";
import passport from "passport";
const router = express.Router();

router.post("/register", validate(signupSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

router.get("/google", (req, res, next) => {
    const { erpId } = req.query; // Frontend se aayega
    passport.authenticate("google", { 
        scope: ["profile", "email"],
        state: erpId // Ye value 'req.query.state' ban kar callback mein milegi
    })(req, res, next);
});


router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login"
    }),
    googleCallback
);

export default router;