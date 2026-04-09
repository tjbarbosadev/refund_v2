import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction } from 'express';

export function verifyUserAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      throw new AppError('User role is missing.');
    }

    if (!role.includes(userRole)) {
      throw new AppError('Insufficient permissions.');
    }

    return next();
  };
}
