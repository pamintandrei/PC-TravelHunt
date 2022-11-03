import { Router } from 'express';

import { getFromDataBase, createBuilding, getTodos, updateBuilding, deleteBuilding, getBuilding } from '../controllers/todos';

const router = Router();

router.post('/Building/', createBuilding);

router.get('/', getTodos);

router.get('/Database/', getFromDataBase);

router.patch('/Building/:id', updateBuilding);

router.delete('/Building/:id', deleteBuilding);

router.get('/Building/', getBuilding);

export default router;