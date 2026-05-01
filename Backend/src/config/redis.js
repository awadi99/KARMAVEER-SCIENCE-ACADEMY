// src/config/redis.js
import { createClient } from 'redis';
import { authorizedUsers } from '../constants/authInfo.js';

const redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
        tls: true, // 👈 Ye zaroori hai Upstash ke liye
        rejectUnauthorized: false // Free tier hosting ke liye safe hai
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

export const connectRedis = async () => {
    // Agar pehle se connected nahi hai toh hi connect karein
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    console.log("✅ Connected to Redis");

    // Data load karein
    const multi = redisClient.multi();
    for (const user of authorizedUsers) {
        multi.set(`auth:${user.erpId}`, user.role);
    }
    await multi.exec();
    console.log("🚀 Auth data loaded into Redis RAM");
};

export default redisClient;