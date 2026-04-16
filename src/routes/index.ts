import { Router } from 'express';
import { usersRoutes } from './usersRoutes';
import { sessionsRoutes } from './sessionsRoutes';
import { refundsRoutes } from './refundsRoutes';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';
import { uploadsRoutes } from './uploadsRoutes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);

// private routes
routes.use(ensureAuthentication);
routes.use('/refunds', refundsRoutes);
routes.use('/uploads', uploadsRoutes);

export { routes };
