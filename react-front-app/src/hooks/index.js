import useGetCategoryList from './useGetCategoryList';
import { useDispatch } from 'react-redux';
import useGetCategoryInfo from './useGetCategoryInfo';

const useAppDispatch = () => useDispatch();

export { useGetCategoryList, useAppDispatch, useGetCategoryInfo };
