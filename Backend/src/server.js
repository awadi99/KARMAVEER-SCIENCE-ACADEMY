import express from 'express';
import dotenv from 'dotenv'
import { connectionDb } from './config/db.js';
import app from './app.js';
import { connectRedis } from './config/redis.js';


dotenv.config();
const PORT = process.env.PORT || 3000;

await connectionDb();
await connectRedis();
const server = app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});

export default server;