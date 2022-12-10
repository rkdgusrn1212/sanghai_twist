import { configureStore } from '@reduxjs/toolkit';
import { categorySlice } from './services/categorySlice';
import { productListByISlice } from './services/productListByISlice';

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    productListByI : productListByISlice.reducer
  },
});
