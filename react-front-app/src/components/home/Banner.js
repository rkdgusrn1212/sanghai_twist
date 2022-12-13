import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import { useGetCategoryList } from '../../hooks';
import BannerItem from './BannerItem';

/**
 * 해당 카테고리와 그 하위의 리프 카테고리를 리프 리스트에 추가해준다.
 * 인자의 카테고리가 리프 카테고리면 리스트에 넣고 아니면 자식 리스트에 대해 재귀 호출
 * @param {*} category 검사 대상 카테고리
 * @param {*} leafList 리프 카테고리들이 저장될 리스트
 */
const findLeafCat = (category, leafList) => {
  if (category.child) {
    for (let sub of category.child) {
      findLeafCat(sub, leafList);
    }
  } else {
    leafList.push(category);
  }
};

const Banner = () => {
  const [leafCategories, setLeafCategories] = useState([]);
  const { categoryList, isSuccess } = new useGetCategoryList();

  useEffect(() => {
    if (!isSuccess) return;
    let catList = [];
    for (let sub of categoryList.categories) {
      findLeafCat(sub, catList);
    }
    setLeafCategories(catList);
  }, [categoryList, isSuccess, setLeafCategories]);

  return (
    isSuccess && (
      <Carousel>
        {leafCategories.map((category) => (
          <BannerItem category={category} key={category.code} />
        ))}
      </Carousel>
    )
  );
};
export default Banner;
