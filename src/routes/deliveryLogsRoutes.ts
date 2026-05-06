import { Router } from 'express';
import { DeliveryLogsController } from '../controllers/deliveryLogsController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';
import { verifyAuthorizationUser } from '../middlewares/verifyAuthorizationUser.js';

const deliveryLogsController = new DeliveryLogsController();
const deliveryLogsRoutes = Router();

deliveryLogsRoutes.post(
  '/',
  ensureAuthentication,
  verifyAuthorizationUser(['sale']),
  deliveryLogsController.create,
);
deliveryLogsRoutes.get(
  '/:id',
  ensureAuthentication,
  verifyAuthorizationUser(['sale', 'customer']),
  deliveryLogsController.show,
);

export { deliveryLogsRoutes };
