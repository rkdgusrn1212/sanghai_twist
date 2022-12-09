import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import {
  fetchCategories,
  selectStatus,
  selectCategories,
} from '../services/categorySlice';

export default function useGetAllCategory() {
  const dispatch = useAppDispatch();
  const status = useSelector((state) => selectStatus(state));
  const categories = useSelector((state) => selectCategories(state));
  useEffect(() => {
    if (status === undefined) {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);
  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return { categories, isUninitialized, isLoading, isError, isSuccess };
}
