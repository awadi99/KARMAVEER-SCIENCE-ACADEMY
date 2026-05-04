import express from 'express';
const router = express.Router();
import { uploadQuestionSet, getAdminStats, getSchedules } from './test.controller.js';


router.post('/upload-set', uploadQuestionSet);
router.get('/stats', getAdminStats);
router.get('/schedules', getSchedules);

export default router;