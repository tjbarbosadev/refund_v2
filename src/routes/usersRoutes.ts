import { UsersController } from '@/controllers/UsersController';
import { Router } from 'express';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', usersController.index);
usersRoutes.post('/', usersController.create);
usersRoutes.get('/user/:id', usersController.show);
usersRoutes.put('/user/:id', usersController.update);
usersRoutes.delete('/user/:id', usersController.delete);

export { usersRoutes };
