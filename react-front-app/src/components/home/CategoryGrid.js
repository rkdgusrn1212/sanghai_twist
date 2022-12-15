import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
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
  let { hash } = useLocation();
  const [shrink, setShrink] = useState(false);
  const [selected, setSelected] = useState(null);
  const [leafCategories, setLeafCategories] = useState([]);

  const { categoryList } = useGetCategoryList();

  const gridRef = useRef(null);

  useEffect(() => {
    if (!categoryList) return;
    let catList = [];
    for (let sub of categoryList.categories) {
      if (sub.code === selected) {
        findLeafCat(sub, catList, []);
      }
    }
    setLeafCategories(catList);
  }, [selected, categoryList, setLeafCategories]);

  const keyMap = useMemo(() => {
    if(!categoryList) return null;
    const result = {};
    for(let cat of categoryList.categories){
      result[cat.code] = cat.name;
    }
    return result;
  },[categoryList]);

  const handleClick = useCallback(
    (key, nextSelected) => {
      if (!keyMap || !keyMap[key]) return;
      if (nextSelected) {
        setSelected(key);
        setShrink(true);
        gridRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setSelected(null);
        setShrink(false);
      }
    },
    [keyMap],
  );

  useEffect(() => {
    hash && handleClick(parseInt(hash.slice(1)), true); //#만있을때도 hash는 false임.
  }, [hash, handleClick]);

  return (
    <Stack gap={2} ref={gridRef}>
      <div className="d-flex flex-wrap">
        {categoryList ? (
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
        {categoryList ? (
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
