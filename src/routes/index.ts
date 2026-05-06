import { Router } from 'express';
import { usersRoutes } from './usersRoutes.js';
import { sessionsRoutes } from './sessionsRoutes.js';
import { deliveriesRoutes } from './deliveriesRoutes.js';
import { deliveryLogsRoutes } from './deliveryLogsRoutes.js';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/deliveries', deliveriesRoutes);
routes.use('/deliveries-logs', deliveryLogsRoutes);

export { routes };
