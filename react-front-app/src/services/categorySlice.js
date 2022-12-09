import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { categories: [] };

export const fetchCategories = createAsyncThunk(
  'category/fetch',
  async (name, { rejectWithValue }) => {
    const response = await axios({
      method: 'get',
      url: 'http://192.168.0.115:8080/stwist-api/category',
      responseType: 'json',
    });
    const data = response.data;
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  },
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export const selectStatus = (state) => state.category.status;
export const selectCategories = (state) => state.category.categories;
