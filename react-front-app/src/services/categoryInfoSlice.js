import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import server from '../server.json';

/**
 * 해당 카테고리에 대한 상세정보가 저장.
 * 상세정보는 해당 카테고리의 이름 및 코드 그리고 하위 상품에 대한 정보들이다.
 * code, srt, pg는 필수이며, srt, pg는 서버 기본값이 있지만 명시적으로 사용해야한다.
 * 요청 쿼리의 size는 최적화를 위해 고정(12)해서 사용한다. 여러 상태로 나눠 저장되는 것을 방지.
 */
export const fetchCategoryInfo = createAsyncThunk(
  'categoryInfo/fetch',
  async ({code, pg, srt}, { rejectWithValue }) => {
    const response = await axios({
      method: 'get',
      url: `http://${server.host}/stwist-api/category/${code}?size=12&pg=${pg}&srt=${srt}`,
      responseType: 'json',
    });
    const data = response.data;
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  },
);

const getStateIndex = ({code, pg, srt})=> code+'/'+srt+'/'+pg;

export const categoryInfoSlice = createSlice({
  name: 'categoryInfo',
  initialState : { data: {}, status : {} },
  reducers: [],
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryInfo.pending, (state, action) => {
      state.status[getStateIndex(action.meta.arg)] = 'pending';
    });
    builder.addCase(fetchCategoryInfo.fulfilled, (state, action) => {
      state.status[getStateIndex(action.meta.arg)] = 'fulfilled';
      state.data[getStateIndex(action.meta.arg)] = action.payload;
    });
    builder.addCase(fetchCategoryInfo.rejected, (state, action) => {
      state.status[getStateIndex(action.meta.arg)] = 'rejected';
    });
  },
});

export const selectStatus = (state, {code, pg, srt}) => state.categoryInfo.status[getStateIndex({code,pg})];
export const selectData = (state, {code, pg, srt}) => state.categoryInfo.data[getStateIndex({code,pg})];
