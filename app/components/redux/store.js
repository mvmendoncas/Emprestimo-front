import { configureStore } from '@reduxjs/toolkit';
import userLoginSlice from './userLogin/userLoginSlice';
import UiSlice from './ui/uiSlice';

const store = configureStore({
  reducer: {
    userLogin: userLoginSlice,
    ui: UiSlice, 
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
