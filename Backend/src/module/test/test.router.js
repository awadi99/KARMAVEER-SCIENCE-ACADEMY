import express from 'express';
const router = express.Router();

// Sabhi Controllers ko import karein
import { 
    uploadQuestionSet, 
    submitTest, 
    getAdminStats,
    getPracticeQuestions,
    getTestsForStudent ,
    getDashboardSummary
} from './test.controller.js';

import { protect, adminOnly } from '../../middlewares/auth.middleware.js';


router.post('/upload-set', protect, adminOnly, uploadQuestionSet);


router.get('/stats', protect, adminOnly, getAdminStats);



router.get('/list', protect, getTestsForStudent);


router.get('/questions/:testId', protect, getPracticeQuestions);


router.post('/submit', protect, submitTest);

router.get('/summary', protect, adminOnly, getDashboardSummary);

export default router;