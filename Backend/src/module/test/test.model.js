import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    testId: { type: String, required: true, index: true },
    testTitle: { type: String, required: true },
    testDate: { type: Date, required: true }, 
    standard: { type: Number, required: true, index: true },
    qText: { type: String, required: true, trim: true },
    options: [{ type: String, required: true }],
    correctIdx: { type: Number, required: true },
    marks: { type: Number, default: 1 } 
}, { versionKey: false, timestamps: true });


questionSchema.index({ testId: 1, standard: 1 });

export const Question = mongoose.model('Question', questionSchema);