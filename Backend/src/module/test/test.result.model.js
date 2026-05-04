import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    testId: { type: String, required: true, index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    standard: { type: Number, required: true },
    score: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    status: { type: String, enum: ['Pass', 'Fail'], required: true },
    submittedAt: { type: Date, default: Date.now }
}, { versionKey: false });

export const Result = mongoose.model('Result', resultSchema);