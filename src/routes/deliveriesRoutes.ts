import { Router } from 'express';

import { DeliveriesController } from '../controllers/deliveriesControllers.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';
import { verifyAuthorizationUser } from '../middlewares/verifyAuthorizationUser.js';

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthentication);
deliveriesRoutes.use(verifyAuthorizationUser(['sale']));

deliveriesRoutes.post('/', deliveriesController.create);
deliveriesRoutes.get('/', deliveriesController.index);
deliveriesRoutes.patch('/:id/status', deliveriesController.statusUpdate);

export { deliveriesRoutes };
