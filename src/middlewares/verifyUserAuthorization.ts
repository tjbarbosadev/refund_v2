import { UserRole } from '@/generated/prisma/enums';
import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction } from 'express';

export function verifyUserAuthorization(role: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as UserRole | undefined;

    if (!userRole) {
      throw new AppError('User role is missing.');
    }

    if (!role.includes(userRole)) {
      throw new AppError('Insufficient permissions.');
    }

    return next();
  };
}
