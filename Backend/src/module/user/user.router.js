import express from 'express';
import {getAdminStudentList,deleteStudent} from './user.controller.js';

const router = express.Router();

router.get('/students', getAdminStudentList);
router.delete('/:id', deleteStudent);

export default router;