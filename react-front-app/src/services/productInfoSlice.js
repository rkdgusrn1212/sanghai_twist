import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import server from '../server.json';

export const fetchProductInfo = createAsyncThunk(
  'productInfo/fetch',
  async (code, { rejectWithValue }) => {
    const response = await axios({
      method: 'get',
      url: `http://${server.host}/stwist-api/product/${code}`,
      responseType: 'json',
    });
    const data = response.data;
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  },
);

export const productInfoSlice = createSlice({
  name: 'productInfo',
  initialState: { data: {}, status: {} },
  reducers: [],
  extraReducers: (builder) => {
    builder.addCase(fetchProductInfo.pending, (state, action) => {
      state.status[action.meta.arg] = 'pending';
    });
    builder.addCase(fetchProductInfo.fulfilled, (state, action) => {
      state.status[action.meta.arg] = 'fulfilled';
      state.data[action.meta.arg] = action.payload;
    });
    builder.addCase(fetchProductInfo.rejected, (state, action) => {
      state.status[action.meta.arg] = 'rejected';
    });
  },
});

export const selectStatus = (state, code) => state.productInfo.status[code];
export const selectData = (state, code) => state.productInfo.data[code];
