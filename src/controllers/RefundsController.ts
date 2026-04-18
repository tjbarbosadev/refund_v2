import { prisma } from '@/database/prisma';
import { Category } from '@/generated/prisma/enums';
import { Request, Response } from 'express';
import z from 'zod';
import { nativeEnum } from 'zod/v3';

const CategoriesEnum = z.enum(Category);

class RefundsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      description: z
        .string()
        .trim()
        .min(1, { message: 'Descrição é obrigatória.' }),
      category: CategoriesEnum,
      amount: z.number().positive({ message: 'O valor precisa ser positivo.' }),
      filename: z.string().trim().min(10, {
        message: 'O nome do arquivo precisa ter pelo menos 10 caracteres.',
      }),
    });

    const { description, category, amount, filename } = bodySchema.parse(
      req.body,
    );

    const refund = await prisma.refunds.create({
      data: {
        userId: req.user!.id,
        description,
        category,
        amount,
        filename,
      },
    });

    res.json({
      message: 'Refund created',
      data: refund,
    });
  }

  async index(req: Request, res: Response) {
    const querySchema = z.object({
      name: z.string().trim().optional(),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    });

    const { name, page, perPage } = querySchema.parse(req.query);

    const skip = (page - 1) * perPage;

    const refunds = await prisma.refunds.findMany({
      skip,
      take: perPage,
      where: {
        user: {
          name: {
            contains: name?.trim(),
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalRecords = await prisma.refunds.count({
      where: {
        user: {
          name: {
            contains: name?.trim(),
          },
        },
      },
    });

    const totalPages = Math.ceil(totalRecords / perPage);

    res.json({
      refunds,
      pagination: { page, perPage, totalPages, totalRecords },
    });
  }

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid({ message: 'Invalid refund ID format.' }),
    });

    const { id } = paramsSchema.parse(req.params);

    const refund = await prisma.refunds.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!refund) {
      return res.status(404).json({ message: 'Refund not found.' });
    }

    res.json(refund);
  }
}

export { RefundsController };
