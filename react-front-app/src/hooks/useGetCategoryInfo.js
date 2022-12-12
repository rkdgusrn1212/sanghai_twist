import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '.';
import {
  fetchCategoryInfo,
  selectStatus,
  selectData,
} from '../services/categoryInfoSlice';

export default function useGetCategoryInfo({ code, pg, srt }) {
  const dispatch = useAppDispatch();
  const status = useSelector((state) => selectStatus(state, { code, pg, srt }));
  const categoryInfo = useSelector((state) =>
    selectData(state, { code, pg, srt }),
  );
  useEffect(() => {
    if (status === undefined) {
      dispatch(fetchCategoryInfo({ code, pg, srt }));
    }
  }, [status, dispatch, code, pg, srt]);

  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return { categoryInfo, isUninitialized, isLoading, isError, isSuccess };
}
