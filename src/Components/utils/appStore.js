import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default appStore;
