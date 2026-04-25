import { Router } from 'express';

import { DeliveriesController } from '@/controllers/deliveriesControllers';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthentication);
deliveriesRoutes.post('/', deliveriesController.create);

export { deliveriesRoutes };
