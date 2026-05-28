import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import smsRoutes from './routes/sms';
import { initDatabase } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 初始化数据库
initDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/sms', smsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SMS Service is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
