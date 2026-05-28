import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

interface SMSHistoryItem {
  id: number;
  phone: string;
  message: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

interface SMSTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
}

interface SMSState {
  history: SMSHistoryItem[];
  templates: SMSTemplate[];
  loading: boolean;
  error: string | null;
}

const initialState: SMSState = {
  history: [],
  templates: [],
  loading: false,
  error: null,
};

export const sendSMS = createAsyncThunk(
  'sms/send',
  async (data: { phone: string; message: string }) => {
    const response = await axios.post('/api/sms/send', data);
    return response.data;
  }
);

export const getSMSHistory = createAsyncThunk(
  'sms/history',
  async () => {
    const response = await axios.get('/api/sms/history');
    return response.data;
  }
);

export const getTemplates = createAsyncThunk(
  'sms/templates',
  async () => {
    const response = await axios.get('/api/sms/templates');
    return response.data;
  }
);

const smsSlice = createSlice({
  name: 'sms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendSMS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendSMS.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.history.unshift(action.payload);
      })
      .addCase(sendSMS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '发送失败';
      })
      .addCase(getSMSHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(getTemplates.fulfilled, (state, action) => {
        state.templates = action.payload;
      });
  },
});

export default smsSlice.reducer;
