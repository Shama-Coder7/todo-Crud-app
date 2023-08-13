import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    error: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = false;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
