import { Request, Response } from 'express';
import { createSMSRecord, getSMSHistoryByUserId, getTemplates } from '../db';

const TEST_USER_ID = 1;

export const sendSMS = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      res.status(400).json({ error: '手机号和短信内容不能为空' });
      return;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      res.status(400).json({ error: '手机号格式不正确' });
      return;
    }

    const smsId = await createSMSRecord(TEST_USER_ID, phone, message);

    res.status(201).json({
      id: smsId,
      phone,
      message,
      status: 'sent',
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('发送短信错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

export const getSMSHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const history = await getSMSHistoryByUserId(TEST_USER_ID);

    res.json(history);
  } catch (error) {
    console.error('获取短信历史错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};

export const getTemplatesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const templates = await getTemplates();
    res.json(templates);
  } catch (error) {
    console.error('获取模板错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
};
