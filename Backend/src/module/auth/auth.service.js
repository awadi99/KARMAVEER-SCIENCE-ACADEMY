import bcrypt from 'bcryptjs';
import { findUserByEmail,createUser,findUserByEmailForLogin } from './auth.repository.js';
import redisClient from '../../config/redis.js'; 

export const signupService = async({erpId,fullName,email,password})=>{
    const role = await redisClient.get(`auth:${erpId}`);

    if(!role){
        throw new Error("This ERP ID is not authorized to register.")
    }

    const existingUser = await findUserByEmail(email);
    if(existingUser){
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

     const user  = await createUser({
        erpId,
        fullName,
        email,
        password:hashedPassword,
        role:role,
    });

    await redisClient.del(`auth:${erpId}`);
    return user;
};

export const loginService = async({email,password})=>{
    const user = await findUserByEmailForLogin(email);
    
    if(!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password");
    }
    return user;
};
