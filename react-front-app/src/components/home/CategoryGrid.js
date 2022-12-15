import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import { useCallback, useState, useEffect } from 'react';
import { useGetCategoryList } from '../../hooks';
import MajorCategory from './MajorCategory';
import MinorCategory from './MinorCategory';

/**
 * 해당 카테고리와 그 하위의 리프 카테고리를 리프 리스트에 추가해준다.
 * 인자의 카테고리가 리프 카테고리면 리스트에 넣고 아니면 자식 리스트에 대해 재귀 호출
 * @param {*} category 검사 대상 카테고리
 * @param {*} leafList 리프 카테고리들이 저장될 리스트
 */
const findLeafCat = (category, leafList, parent) => {
  if (category.child) {
    parent.push(category.name);
    for (let sub of category.child) {
      findLeafCat(sub, leafList, parent);
    }
    parent.pop();
  } else {
    leafList.push({ ...category, parent: parent.join('>') });
  }
};

const CategoryGrid = () => {
  const [shrink, setShrink] = useState(false);
  const [selected, setSelected] = useState(null);
  const [leafCategories, setLeafCategories] = useState([]);

  const { categoryList, isSuccess } = useGetCategoryList();

  useEffect(() => {
    if (!isSuccess) return;
    let catList = [];
    for (let sub of categoryList.categories) {
      if (sub.code === selected) {
        findLeafCat(sub, catList, []);
      }
    }
    setLeafCategories(catList);
  }, [selected, categoryList, isSuccess, setLeafCategories]);

  const handleClick = useCallback((key, nextSelected) => {
    if (nextSelected) {
      setSelected(key);
      setShrink(true);
    } else {
      setSelected(null);
      setShrink(false);
    }
  }, []);

  return (
    <Stack gap={2}>
      <div className="d-flex flex-wrap">
        {isSuccess ? (
          categoryList.categories.map((category) => (
            <MajorCategory
              key={category.code}
              shrink={shrink}
              selected={selected === category.code}
              category={category}
              onClick={(nextSelected) =>
                handleClick(category.code, nextSelected)
              }
            />
          ))
        ) : (
          <Spinner animation="grow" />
        )}
      </div>
      <div className="d-flex flex-wrap">
        {isSuccess ? (
          leafCategories.map((category, i) => (
            <MinorCategory
              key={category.code}
              category={category}
              onClick={(nextSelected) =>
                handleClick(category.code, nextSelected)
              }
              delay={100 * i + 100}
            />
          ))
        ) : (
          <Spinner animation="grow" />
        )}
      </div>
    </Stack>
  );
};
export default CategoryGrid;
