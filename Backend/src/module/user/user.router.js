import express from 'express';
import {getAdminStudentList,deleteStudent,getDashboardSummary} from './user.controller.js';
import { adminOnly, protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/students',protect,adminOnly, getAdminStudentList);
router.delete('/:id', protect,adminOnly,deleteStudent);
router.get('/summary', protect, adminOnly, getDashboardSummary);

export default router;