import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression'; // 🚀 Added for speed
import passport from 'passport';

import authRoutes from "./module/auth/auth.router.js"
import userRoutes from './module/user/user.router.js';
import testRoutes from './module/test/test.router.js';
import "./module/auth/google.strategy.js";

const app = express();

app.set("trust proxy", 1);

app.use(compression()); 


app.use(cors({
    origin: ['https://karmaveer-science-academy-53pt.vercel.app', 'http://localhost:5173'], 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
app.use(helmet({
    crossOriginOpenerPolicy: false,
}));

app.use(express.json({ limit: '50kb' })); 
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

app.use(cookieParser());
app.use(passport.initialize());


app.get("/", (req, res) => {
    res.send("API is running optimized for 1000+ students 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/test", testRoutes);

export default app;