import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './services/categorySlice';
import { categoryInfoSlice } from './services/categoryInfoSlice';

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    categoryInfo : categoryInfoSlice.reducer
  },
});
