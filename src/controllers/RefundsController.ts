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
        .min(1, { message: 'Description is required.' }),
      category: CategoriesEnum,
      amount: z
        .number()
        .positive({ message: 'Amount must be a positive number.' }),
      filename: z.string().trim().min(20, { message: 'Filename is required.' }),
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
      name: z.string().trim().min(1).optional(),
    });

    const { name } = querySchema.parse(req.query);

    const refunds = await prisma.refunds.findMany({
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

    res.json({ refunds });
  }
}

export { RefundsController };
