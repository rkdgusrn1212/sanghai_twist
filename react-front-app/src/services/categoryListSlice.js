import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import server from '../server.json';

export const fetchCategoryList = createAsyncThunk(
  'categoryList/fetch',
  async (name, { rejectWithValue }) => {
    const response = await axios({
      method: 'get',
      url: `http://${server.host}/stwist-api/category`,
      responseType: 'json',
    });
    const data = response.data;
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  },
);

export const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState: { data: undefined, status: undefined },
  reducers: [],
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryList.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchCategoryList.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
    });
    builder.addCase(fetchCategoryList.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export const selectStatus = (state) => state.categoryList.status;
export const selectData = (state) => state.categoryList.data;
