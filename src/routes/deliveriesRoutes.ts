import { Router } from 'express';

import { DeliveriesController } from '@/controllers/deliveriesControllers';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';
import { verifyAuthorizationUser } from '@/middlewares/verifyAuthorizationUser';

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthentication);
deliveriesRoutes.use(verifyAuthorizationUser(['sale']));

deliveriesRoutes.post('/', deliveriesController.create);
deliveriesRoutes.get('/', deliveriesController.index);

export { deliveriesRoutes };
