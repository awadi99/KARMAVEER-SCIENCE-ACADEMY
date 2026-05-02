import jwt from 'jsonwebtoken';

export const generateToken = (userData,res)=>{
    const token = jwt.sign(
        { 
            id: userData.id,      // Sirf string ID
            role: userData.role,  // Role
            erpId: userData.erpId // ERP ID
        }, 
        process.env.JWT_SECRET,
        {expiresIn:'7d',}
    );
    res.cookie("jwt",token,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return token;
}

