import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from "./module/auth/auth.router.js"
import userRoutes from './module/user/user.router.js';
import testRoutes from './module/test/test.router.js';
import passport from 'passport';
import "./module/auth/google.strategy.js";


const app = express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}));
app.use(helmet({
    crossOriginOpenerPolicy: false,
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser());

app.use(passport.initialize());

app.get("/",(req,res)=>{
    res.send("api is running");
});

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes);
app.use("/api/test",testRoutes);




export default app;