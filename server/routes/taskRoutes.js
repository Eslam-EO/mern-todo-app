import { Router } from 'express';
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask,
} from '../controllers/taskControllers.js';

const router = Router();

router.get('/tasks', getTasks);
router.post('/new', addTask);
router.put('/edit/:id', updateTask);
router.put('/complete/:id', completeTask);
router.delete('/delete/:id', deleteTask);

export default router;
