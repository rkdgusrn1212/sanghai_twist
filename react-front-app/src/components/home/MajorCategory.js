import { useEffect, useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Card from 'react-bootstrap/Card';
import { run as runHolder } from 'holderjs';
import { useGetCategoryInfo } from '../../hooks';
import './MajorCategory.scss';

const MajorCategory = ({ category, shrink, onClick, selected }) => {
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
    onClick && onClick(!selected);
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
          className="card-img"
          src={categoryInfo.products.items[0].image.high}
        />
      ) : (
        <Card.Img id="major-category-img-holder" src="holder.js/100px300" />
      )}
      <Card.ImgOverlay className="major-category-card-body">
        <Card.Title className="major-category-card-title">
          {category.name}
        </Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
};
export default MajorCategory;
