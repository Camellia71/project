import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: sessionStorage.getItem('token') || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; //把token存到redux里面
      sessionStorage.setItem('token', action.payload); //把token存到sessionStorage里面
    },
    clearToken: state => {
      state.token = null;
      sessionStorage.removeItem('token');
    },
  },
});
export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
