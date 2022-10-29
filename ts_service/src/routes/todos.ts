import { Router } from 'express';

import { getFromDataBase, createTodo, getTodos, updateTodo, deleteTodo, getBuilding } from '../controllers/todos';

const router = Router();

router.post('/', createTodo);

router.get('/', getTodos);

router.get('/Database/', getFromDataBase);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

router.get('/Building/', getBuilding);

export default router;