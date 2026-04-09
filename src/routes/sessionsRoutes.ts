import { SessionsController } from '@/controllers/SessionsController';
import { Router } from 'express';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.get('/', sessionsController.index);
sessionsRoutes.post('/', sessionsController.create);

export { sessionsRoutes };
