import { configureStore } from '@reduxjs/toolkit';
import authReducer from './login/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
