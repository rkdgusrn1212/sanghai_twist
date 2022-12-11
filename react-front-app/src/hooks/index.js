import useGetAllCategory from './useGetAllCategory';
import { useDispatch } from 'react-redux';
import useGetCategoryInfo from './useGetCategoryInfo';

const useAppDispatch = () => useDispatch();

export { useGetAllCategory, useAppDispatch, useGetCategoryInfo };
