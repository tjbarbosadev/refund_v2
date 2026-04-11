import express, { Request, Response } from 'express';
import cors from 'cors';
import { errorHandling } from '@/middlewares/errorHandling';
import uploadConfig from '@/configs/upload';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.send({ status: 'ok' });
});

app.use('/uploads', express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);
app.use(errorHandling);

export { app };
