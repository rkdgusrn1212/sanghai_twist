import useGetAllCategory from './useGetAllCategory';
import { useDispatch } from 'react-redux';
import useGetProductListByI from './useGetProductListByI';

const useAppDispatch = () => useDispatch();

export { useGetAllCategory, useAppDispatch , useGetProductListByI};
