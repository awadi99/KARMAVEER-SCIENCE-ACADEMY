import User from './auth.model.js';

export const findUserByEmail =async(email)=>{
    return await User.findOne({email});
};

export const findUserByEmailForLogin = async (email) => {
    return await User.findOne({ email }).select("+password").lean();
};

export const  createUser = async(data)=>{
    return await User.create(data);
};

export const findUserById = async (userId) => { 
    
    return await User.findById(userId);
};