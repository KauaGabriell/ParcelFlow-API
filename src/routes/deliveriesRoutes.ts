import { Router } from 'express';

import { DeliveriesController } from '@/controllers/deliveriesControllers';

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.post('/', deliveriesController.create);

export { deliveriesRoutes };
