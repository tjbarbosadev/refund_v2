import { authCofig } from '@/configs/authCofig';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import z from 'zod';

class SessionsController {
  async index(req: Request, res: Response) {
    res.json({ message: 'Sessions index' });
  }

  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z
        .string()
        .trim()
        .email({ message: 'Endereço de email inválido' })
        .toLowerCase(),
      password: z.string().trim(),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      throw new AppError('E-mail ou senha inválidos', 401);
    }

    const { secret, expiresIn } = authCofig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword,
    });
  }
}

export { SessionsController };
