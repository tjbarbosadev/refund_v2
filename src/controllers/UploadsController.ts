import { Request, Response } from 'express';
import uploadConfig from '@/configs/upload';
import z, { ZodError } from 'zod';
import { DiskStorage } from '@/providers/diskStorage';
import { AppError } from '@/utils/AppError';
import { diskStorage } from 'multer';

class UploadsController {
  async create(req: Request, res: Response) {
    const diskStorage = new DiskStorage();
    try {
      const fileSchema = z.looseObject({
        filename: z.string().min(1, 'Filename is required'),
        mimetype: z
          .string()
          .refine(
            (value) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(value),
            'Formato invalido. Formato permitido: ' +
              uploadConfig.ACCEPTED_IMAGE_TYPES.join(', '),
          ),
        size: z
          .number()
          .positive()
          .refine(
            (size) => size <= uploadConfig.MAX_FILE_SIZE,
            `Arquivo deve ser menor que ${uploadConfig.MAX_SIZE}MB`,
          ),
      });

      const file = fileSchema.parse(req.file);
      const fileName = await diskStorage.saveFile(file.filename);

      return res.json({ msg: 'File uploaded successfully', fileName });
    } catch (error) {
      if (error instanceof ZodError) {
        if (req.file) {
          await diskStorage.deleteFile(req.file.filename, 'tmp');
        }
        throw new AppError(
          `Erro ao fazer upload do arquivo: ${error.issues.map((issue) => issue.message).join(', ')}`,
          500,
        );
      }
    }
  }
}

export { UploadsController };
