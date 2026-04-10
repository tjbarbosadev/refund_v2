import { prisma } from '@/database/prisma';
import { UserRole } from '@/generated/prisma/enums';
import { AppError } from '@/utils/AppError';
import { hash } from 'bcrypt';
import z from 'zod';

class UsersController {
  async index(req: any, res: any) {
    const users = await prisma.user.findMany({});

    res.json({ users });
  }

  async show(req: any, res: any) {
    const { id } = req.params;
    res.json({ message: `User ${id}` });
  }

  async create(req: any, res: any) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: 'Nome precisa ter pelo menos 2 caracteres' }),
      email: z
        .string()
        .trim()
        .email({ message: 'Endereço de email inválido' })
        .toLowerCase(),
      password: z
        .string()
        .trim()
        .min(6, { message: 'Senha precisa ter pelo menos 6 caracteres' }),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    const userWithEmail = await prisma.user.findUnique({ where: { email } });

    if (userWithEmail) {
      throw new AppError('Email already in use', 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    res.json({ user: { name, email, role } });
  }

  async update(req: any, res: any) {
    const { id } = req.params;
    const { name } = req.body;
    res.json({ message: `User ${id} updated to ${name}` });
  }

  async delete(req: any, res: any) {
    const { id } = req.params;
    res.json({ message: `User ${id} deleted` });
  }
}

export { UsersController };
