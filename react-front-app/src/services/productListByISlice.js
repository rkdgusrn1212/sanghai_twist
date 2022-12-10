import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import server from '../server.json';

const initialState = { data: {}, status : {} };

/**
 * srt=I로 요청한 상품 리스트가 저장.
 */
export const fetchProductListByI = createAsyncThunk(
  'productListByI/fetch',
  async ({code, pg}, { rejectWithValue }) => {
    const response = await axios({
      method: 'get',
      url: `http://${server.host}/stwist-api/category/${code}?srt=I`+(pg&&`&pg=${pg}`),
      responseType: 'json',
    });
    const data = response.data;
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  },
);

export const productListByISlice = createSlice({
  name: 'productListByI',
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder.addCase(fetchProductListByI.pending, (state, action) => {
      if(!state.status[action.meta.arg.code])state.status[action.meta.arg.code]={};
      state.status[action.meta.arg.code][action.meta.arg.pg] = 'pending';
    });
    builder.addCase(fetchProductListByI.fulfilled, (state, action) => {
      if(!state.status[action.meta.arg.code])state.status[action.meta.arg.code]={};
      state.status[action.meta.arg.code][action.meta.arg.pg] = 'fulfilled';
      if(!state.data[action.meta.arg.code])state.data[action.meta.arg.code]={};
      state.data[action.meta.arg.code][action.meta.arg.pg] = action.payload;
    });
    builder.addCase(fetchProductListByI.rejected, (state, action) => {
      if(!state.status[action.meta.arg.code])state.status[action.meta.arg.code]={};
      state.status[action.meta.arg.code][action.meta.arg.pg] = 'rejected';
    });
  },
});

export const selectStatus = (state, {code, pg}) => state.productListByI.status[code]&&state.productListByI.status[code][pg];
export const selectData = (state, {code, pg}) => state.productListByI.data[code]&&state.productListByI.data[code][pg];
