import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './services/categorySlice';

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
  },
});
