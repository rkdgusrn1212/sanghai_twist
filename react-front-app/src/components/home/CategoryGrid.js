import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useCallback, useState, useMemo } from 'react';
import { useGetCategoryList } from '../../hooks';
import MajorCategory from './MajorCategory';

const CategoryGrid = () => {
  const [shrink, setShrink] = useState(false);
  const [selected, setSelected] = useState(null);

  const { categoryList, isSuccess } = useGetCategoryList();

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
    <div className="d-flex">
          {isSuccess ? (
            categoryList.categories.map((category) => (
              <MajorCategory
                shrink={shrink}
                selected={selected === category.code}
                category={category}
                key={category.code}
                onClick={(nextSelected) =>
                  handleClick(category.code, nextSelected)
                }
              />
            ))
          ) : (
            <Spinner animation="grow" />
          )}
    </div>
  );
};
export default CategoryGrid;
