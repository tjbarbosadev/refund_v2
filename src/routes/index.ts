import { Router } from 'express';
import { usersRoutes } from './usersRoutes';
import { sessionsRoutes } from './sessionsRoutes';
import { refundsRoutes } from './refundsRoutes';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/users', ensureAuthentication, usersRoutes);

// private routes
routes.use('/refunds', ensureAuthentication, refundsRoutes);

export { routes };
