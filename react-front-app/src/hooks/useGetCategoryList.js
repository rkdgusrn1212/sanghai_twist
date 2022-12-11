import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '.';
import {
  fetchCategoryList,
  selectStatus,
  selectData,
} from '../services/categoryListSlice';

export default function useGetCategoryList() {
  const dispatch = useAppDispatch();
  const status = useSelector((state) => selectStatus(state));
  const categoryList = useSelector((state) => selectData(state));
  useEffect(() => {
    console.log(status);
    console.log(categoryList);
    if (status === undefined) {
      dispatch(fetchCategoryList());
    }
  }, [status, dispatch]);
  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return { categoryList, isUninitialized, isLoading, isError, isSuccess };
}
