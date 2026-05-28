import { Request, Response } from 'express';
import { createUser, findUserByEmail, verifyPassword } from '../db';
import { generateToken } from '../middleware/auth';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: '邮箱和密码不能为空' });
      return;
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: '邮箱或密码错误' });
      return;
    }

    const isValidPassword = verifyPassword(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: '邮箱或密码错误' });
      return;
    }

    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: '邮箱和密码不能为空' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: '密码长度至少为6位' });
      return;
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ error: '该邮箱已被注册' });
      return;
    }

    const userId = await createUser(email, password, name);
    const token = generateToken(userId);

    res.status(201).json({
      user: {
        id: userId,
        email,
        name: name || null,
      },
      token,
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};
