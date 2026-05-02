import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./auth.model.js";
import redisClient from "../../config/redis.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/auth/google/callback",
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value?.toLowerCase(); // Case-sensitive issue se bachne ke liye
                
                if (!email) {
                    return done(null, false, { message: "Email not found" });
                }

                // 1. Existing User Check
                let user = await User.findOne({ email });

                if (user) {
                    // Agar user mil gaya toh seedha login
                    return done(null, user);
                }

                // 2. New User Registration Logic
                // Agar user nahi mila, toh 'state' honi hi chahiye
                const state = req.query.state;

                if (!state) {
                    // Yeh error tab aayega jab naya user direct login page se click karega
                    return done(null, false, { message: "Invalid or expired ERP ID. Please try again." });
                }

                let erpId;
                try {
                    // Try parsing as JSON first, then fallback to split
                    if (state.startsWith('{')) {
                        const parsed = JSON.parse(state);
                        erpId = parsed.erpId;
                    } else {
                        erpId = state.split('|')[0];
                    }
                } catch (e) {
                    return done(null, false, { message: "Invalid session state" });
                }

                if (!erpId) {
                    return done(null, false, { message: "ERP ID required" });
                }

                // 3. Redis Validation
                const role = await redisClient.get(`auth:${erpId}`);
                if (!role) {
                    return done(null, false, { message: "Invalid or expired ERP ID. Please try again." });
                }

                // 4. Create New User
                user = await User.create({
                    fullName: profile.displayName,
                    email,
                    erpId,
                    profilePic: profile.photos?.[0]?.value,
                    role,
                    isGoogleUser: true
                });

                await redisClient.del(`auth:${erpId}`);
                return done(null, user);

            } catch (error) {
                console.error("Critical Google Strategy Error:", error);
                return done(error, null);
            }
        }
    )
);

export default passport;