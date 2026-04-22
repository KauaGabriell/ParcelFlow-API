import { Router } from 'express';

import { UserController } from '@/controllers/usersController';

const usersRoutes = Router();
const usersControllers = new UserController();

usersRoutes.get('/', usersControllers.create);

export { usersRoutes };
