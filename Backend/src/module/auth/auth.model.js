import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
    {
        erpId: {
            type: String,
            required: true, 
            unique: true,
            sparse: true,
            trim: true,
            index: true,
            minLength: 3,
            maxLength: 20,
        },
        fullName: {
            type: String,
            index:true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
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
            select: false, // Security: Query mein password default nahi aayega
        },
        role: {
            type: String,
            required: true,
            enum: ["student", "admin"],
            default: "student", // Safety for auto-registrations
        },
        isGoogleUser: {
            type: Boolean,
            default: false,
        },
        profilePic: {
            type: String,
            default: "",
        },
        
        standard: {
            type: Number,
            enum: [11, 12],
            default: null, 
            index: true,
        },
        stream: {
            type: String,
            enum: ["PCM", "PCB", "PCMB", null],
            default: null,
            index: true,
        },
    },
    { timestamps: true }
);


authSchema.index({ standard: 1, stream: 1 });

const User = mongoose.model("User", authSchema);

export default User;