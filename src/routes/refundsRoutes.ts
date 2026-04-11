import { RefundsController } from '@/controllers/RefundsController';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization';
import { Router } from 'express';

const refundsRoutes = Router();
const refundsController = new RefundsController();

refundsRoutes.get(
  '/',
  verifyUserAuthorization(['manager']),
  refundsController.index,
);
refundsRoutes.post(
  '/',
  // verifyUserAuthorization(['employee']),
  refundsController.create,
);

refundsRoutes.get(
  '/:id',
  verifyUserAuthorization(['employee', 'manager']),
  refundsController.show,
);

export { refundsRoutes };
