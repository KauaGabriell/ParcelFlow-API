import { Router } from 'express';
import { usersRoutes } from './usersRoutes';
import { sessionsRoutes } from './sessionsRoutes';
import { deliveriesRoutes } from './deliveriesRoutes';
import { deliveryLogsRoutes } from './deliveryLogsRoutes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/deliveries', deliveriesRoutes);
routes.use('/deliveries-logs', deliveryLogsRoutes);

export { routes };
