import { RefundsController } from '@/controllers/RefundsController';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization';
import { Router } from 'express';

const refundsRoutes = Router();
const refundsController = new RefundsController();

refundsRoutes.use(ensureAuthentication);

refundsRoutes.get('/', refundsController.index);
refundsRoutes.post(
  '/',
  verifyUserAuthorization(['employee']),
  refundsController.create,
);

export { refundsRoutes };
