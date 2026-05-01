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
            passReqToCallback:true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {

                const email = profile.emails?.[0]?.value;
                let user = await User.findOne({email});

                if (!email) {
                    return done(new Error("Email not found"), null);
                }

                if (!user) {
                    const erpId = req.query.state;
                    const role = await redisClient.get(`auth:${erpId}`);

                    if(!role) return done(new Error("Unauthorized ERP ID"),null);

                    user = await User.create({
                        fullName: profile.displayName,
                        email,
                        erpId,
                        profilePic: profile.photos?.[0]?.value,
                        role,
                        isGoogleUser: true
                    });
                }
                await redisClient.del(`auth:${erpId}`);
                return done(null, user);
                
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;