import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/store/slices/authSlice'
import smsSlice from '@/store/slices/smsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    sms: smsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
