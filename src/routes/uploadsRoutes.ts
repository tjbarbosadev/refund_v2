import uploadConfig from '@/configs/upload';
import { UploadsController } from '@/controllers/UploadsController';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization';
import { Router } from 'express';
import multer from 'multer';

const upload = multer(uploadConfig.MULTER);

const uploadsRoutes = Router();
const uploadsController = new UploadsController();

uploadsRoutes.use(verifyUserAuthorization(['employee']));
uploadsRoutes.post('/', upload.single('file'), uploadsController.create);

export { uploadsRoutes };
