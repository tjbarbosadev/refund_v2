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
}

export { RefundsController };
