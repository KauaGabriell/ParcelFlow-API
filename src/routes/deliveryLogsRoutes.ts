import { Router } from 'express';
import { DeliveryLogsController } from '@/controllers/deliveryLogsController';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';
import { verifyAuthorizationUser } from '@/middlewares/verifyAuthorizationUser';

const deliveryLogsController = new DeliveryLogsController();
const deliveryLogsRoutes = Router();

deliveryLogsRoutes.post(
  '/',
  ensureAuthentication,
  verifyAuthorizationUser(['sale']),
  deliveryLogsController.create,
);

export { deliveryLogsRoutes };
