import express from 'express';
import { sendSMS, getSMSHistory, getTemplatesHandler } from '../controllers/smsController';

const router = express.Router();

router.post('/send', sendSMS);
router.get('/history', getSMSHistory);
router.get('/templates', getTemplatesHandler);

export default router;
