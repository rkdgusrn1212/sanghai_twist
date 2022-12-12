import { configureStore } from '@reduxjs/toolkit';
import { categoryListSlice } from './services/categoryListSlice';
import { categoryInfoSlice } from './services/categoryInfoSlice';
import { productInfoSlice } from './services/productInfoSlice';

export const store = configureStore({
  reducer: {
    categoryList: categoryListSlice.reducer,
    categoryInfo: categoryInfoSlice.reducer,
    productInfo: productInfoSlice.reducer,
  },
});
