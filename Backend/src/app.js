import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression'; // 🚀 Added for speed
import passport from 'passport';

import authRoutes from "./module/auth/auth.router.js";
import userRoutes from './module/user/user.router.js';
import testRoutes from './module/test/test.router.js';
import "./module/auth/google.strategy.js";

const app = express();

// 1. 🎯 trust proxy core parameter setting (Render ke load balancer ke liye must hai)
app.set("trust proxy", 1);

app.use(compression()); 

// 2. 🎯 Highly Specific Production CORS Settings (Bina trailing slash ke)
const allowedOrigins = [
    'https://karmaveerscienceacademy.in', // Main Production Vercel Domain
    'http://localhost:5173'                             // Local Testing
];

app.use(cors({
    origin: function (origin, callback) {
        // Allows server-to-server or postman requests with no origin header
        if (!origin) return callback(null, true);
        
        // Match standard list or dynamically support any vercel sub-preview link
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        } else {
            return callback(new Error('Blocked by CORS Configuration Layer'));
        }
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(helmet({
    crossOriginOpenerPolicy: false,
}));

app.use(express.json({ limit: '50kb' })); 
app.use(express.urlencoded({ extended: true, limit: '50kb' }));


app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("API is running ");
});

app.get("/ping", (req, res) => {
    res.status(200).send("pong");
});


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/test", testRoutes);

export default app;