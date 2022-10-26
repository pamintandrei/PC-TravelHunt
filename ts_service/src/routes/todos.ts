import { Router } from 'express';

import { createTodo, getTodos, updateTodo, deleteTodo, getBuilding } from '../controllers/todos';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodos);

router.get('/Building/', getBuilding);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;