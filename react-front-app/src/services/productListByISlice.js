import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import server from '../server.json';

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


const getStateIndex = ({code, pg})=> code+'/'+pg;

export const productListByISlice = createSlice({
  name: 'productListByI',
  initialState : { data: {}, status : {} },
  reducers: [],
  extraReducers: (builder) => {
    builder.addCase(fetchProductListByI.pending, (state, action) => {
      state.status[getStateIndex(action.meta.arg)] = 'pending';
    });
    builder.addCase(fetchProductListByI.fulfilled, (state, action) => {
      state.status[getStateIndex(action.meta.arg)] = 'fulfilled';
      state.data[getStateIndex(action.meta.arg)] = action.payload;
    });
    builder.addCase(fetchProductListByI.rejected, (state, action) => {
      state.status[getStateIndex(action.meta.arg)] = 'rejected';
    });
  },
});

export const selectStatus = (state, {code, pg}) => state.productListByI.status[getStateIndex({code,pg})];
export const selectData = (state, {code, pg}) => state.productListByI.data[getStateIndex({code,pg})];
