import express from 'express';
const router = express.Router();


import { 
    uploadQuestionSet, 
    submitTest, 
    getAdminStats 
} from './test.controller.js';


import { protect, adminOnly } from '../../middlewares/auth.middleware.js';



router.post('/upload-set', protect, adminOnly, uploadQuestionSet);


router.post('/submit', protect, submitTest);


router.get('/stats', protect, adminOnly, getAdminStats);

export default router;