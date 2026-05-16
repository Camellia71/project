import { configureStore } from '@reduxjs/toolkit';
import authSlice from './login/authSlice';
import userSlice from './user/userSlice';
import contractSlice from './finance/contractSlice';
import selectedIdsSlice from './selection/selectedIdsSlice';

export const store = configureStore({
  reducer: {
    authSlice,
    userSlice,
    contractSlice,
    selectedIds: selectedIdsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;