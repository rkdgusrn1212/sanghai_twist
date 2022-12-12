import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '.';
import {
  fetchProductInfo,
  selectStatus,
  selectData,
} from '../services/productInfoSlice';

export default function useGetProductInfo(code) {
  const dispatch = useAppDispatch();
  const status = useSelector((state) => selectStatus(state, code));
  const productInfo = useSelector((state) => selectData(state, code));
  useEffect(() => {
    if (status === undefined) {
      dispatch(fetchProductInfo(code));
    }
  }, [status, dispatch, code]);

  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return { productInfo, isUninitialized, isLoading, isError, isSuccess };
}
