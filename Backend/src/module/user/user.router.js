import express from 'express';
import {getAdminStudentList,deleteStudent} from './user.controller.js';
import { adminOnly, protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/students',protect,adminOnly, getAdminStudentList);
router.delete('/:id', protect,adminOnly,deleteStudent);

export default router;