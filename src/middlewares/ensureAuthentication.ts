import { authCofig } from '@/configs/authCofig';
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  role: string;
  sub: string;
}

export function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Token is missing.');
    }

    const [, token] = authHeader.split(' ');

    const { role, sub: user_id } = verify(
      token,
      authCofig.jwt.secret,
    ) as TokenPayload;

    req.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token.', 401);
  }
}
