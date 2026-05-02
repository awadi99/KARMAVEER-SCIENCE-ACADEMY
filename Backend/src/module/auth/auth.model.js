import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
    {
        erpId: {
            type: String,
            required: true, // Kyunki aapka logic hai ki sabko pehle ERP ID bharni hi hai
            unique: true,
            sparse: true,
            trim: true,
            index:true,
            minLength: 3,
            maxLength: 30,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index:true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        password: {
            type: String,
            required: function () {
                return !this.isGoogleUser;
            },
            minLength: 8,
            select: false,
        },
        // --- NEW FIELDS ADDED BELOW ---
        role: {
            type: String,
            required: true,
            enum: ["student", "admin"],
        },
        isGoogleUser: {
            type: Boolean,
            default: false,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

authSchema.index({ email: 1, erpId: 1 });

const User = mongoose.model("User", authSchema); // "newUser" ko "User" kar diya (Standard naming)

export default User;