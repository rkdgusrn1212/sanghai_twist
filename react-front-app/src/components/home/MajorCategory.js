import { useState, useEffect, useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Card from 'react-bootstrap/Card';
import { run as runHolder } from 'holderjs';
import { useGetCategoryInfo } from '../../hooks';
import './MajorCategory.scss';

const MajorCategory = ({ category, shrink, onClick }) => {
  const [selected, setSelected] = useState(false);
  const { categoryInfo, isSuccess } = useGetCategoryInfo({
    code: category.code,
    pg: 1,
    srt: 'I',
  });

  useEffect(() => {
    runHolder({
      images: '#major-category-img-holder',
    });
  }, []);

  const handleClicked = useCallback(() => {
    const nextSelected = !selected;
    setSelected(nextSelected);
    onClick && onClick(nextSelected);
  }, [selected, onClick]);

  return (
    <Card
      className={[
        'major-category-card',
        shrink && 'major-category-card-shrink',
        selected && 'major-category-card-selected',
      ].join(' ')}
      onClick={handleClicked}
    >
      {isSuccess && categoryInfo.products.items[0] ? (
        <LazyLoadImage
          className="card-img-top"
          src={categoryInfo.products.items[0].image.high}
        />
      ) : (
        <Card.Img id="major-category-img-holder" src="holder.js/100px300" />
      )}
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
};
export default MajorCategory;
