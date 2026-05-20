import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    testId: { type: String, unique: true, index: true },
    testTitle: { type: String, required: true },
    subject: { 
        type: String, 
        enum: ['Physics', 'Chemistry', 'Biology', 'Mathematics','JEE','MHT-CET'], 
        required: true 
    },
    standard: { type: Number, enum: [11, 12], required: true, index: true },
    totalQuestions: { type: Number, enum: [20, 50], required: true }, // Strict count
    testDate: { type: Date, default: Date.now }
}, { timestamps: true, versionKey: false });

testSchema.index({ standard: 1, subject: 1, createdAt: -1 });

export const Test = mongoose.model('Test', testSchema);

// question schema //
const questionSchema = new mongoose.Schema({
    testId: { type: String, required: true, index: true }, // Link to Test
    qText: { type: String, required: true, trim: true },
    options: {
        type: [String],
        validate: [v => v.length === 4, "Exactly 4 options required"]
    },
    correctIdx: { type: Number, required: true, min: 0, max: 3 }, // Index based
    marks: { type: Number, default: 1 }
}, { versionKey: false });




export const Question = mongoose.model('Question', questionSchema);

// result schema

const resultSchema = new mongoose.Schema({
    testId: { type: String, required: true, index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    standard: { type: Number, required: true, enum: [11, 12] },
    studentAnswers: [Number], // Storing only indexes [0, 2, 1...]
    score: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    status: { type: String, enum: ['Pass', 'Fail'], required: true },

    submittedAt: { type: Date, default: Date.now }
}, { versionKey: false,timestamps: true });

resultSchema.index({ testId: 1, studentId: 1 }, { unique: true });
export const Result = mongoose.model('Result', resultSchema);