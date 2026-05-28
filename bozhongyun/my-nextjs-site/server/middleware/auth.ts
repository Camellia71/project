import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    name?: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: '未提供认证令牌' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const user = await findUserById(decoded.userId);
    if (!user) {
      res.status(401).json({ error: '用户不存在' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('认证错误:', error);
    res.status(401).json({ error: '无效的认证令牌' });
  }
};

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};
