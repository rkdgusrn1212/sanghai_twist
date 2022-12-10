import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '.';
import {
  fetchProductListByI,
  selectStatus,
  selectData,
} from '../services/productListByISlice';

export default function useGetProductListByI({code, pg}) {
  const dispatch = useAppDispatch();
  const status = useSelector((state) => selectStatus(state,{code,pg}));
  const productListByI = useSelector((state) => selectData(state,{code,pg}));
  useEffect(() => {
    if (status === undefined) {
      dispatch(fetchProductListByI({code, pg}));
    }
  }, [status, dispatch, code, pg]);

  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return { productListByI, isUninitialized, isLoading, isError, isSuccess };
}
