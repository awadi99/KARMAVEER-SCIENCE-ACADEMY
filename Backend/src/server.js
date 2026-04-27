import express from 'express';
import dotenv from 'dotenv'
import { connectionDb } from './config/db.js';
import app from './app.js';


dotenv.config();
const PORT = process.env.PORT || 3000;

connectionDb();
const server = app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});

export default server;