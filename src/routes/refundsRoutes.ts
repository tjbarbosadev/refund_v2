import { RefundsController } from '@/controllers/RefundsController';
import { Router } from 'express';

const refundsRoutes = Router();
const refundsController = new RefundsController();

refundsRoutes.get('/', refundsController.index);
refundsRoutes.post('/', refundsController.create);

export { refundsRoutes };
