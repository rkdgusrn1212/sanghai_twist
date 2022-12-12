import useGetCategoryList from './useGetCategoryList';
import { useDispatch } from 'react-redux';
import useGetCategoryInfo from './useGetCategoryInfo';
import useGetProductInfo from './useGetProductInfo';

const useAppDispatch = () => useDispatch();

export { useGetCategoryList, useAppDispatch, useGetCategoryInfo, useGetProductInfo };
