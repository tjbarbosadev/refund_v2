import { UsersController } from '@/controllers/UsersController';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization';
import { Router } from 'express';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get(
  '/',
  verifyUserAuthorization(['manager']),
  usersController.index,
);
usersRoutes.post(
  '/',
  verifyUserAuthorization(['manager']),
  usersController.create,
);
usersRoutes.get('/user/:id', usersController.show);
usersRoutes.put('/user/:id', usersController.update);
usersRoutes.delete('/user/:id', usersController.delete);

export { usersRoutes };
