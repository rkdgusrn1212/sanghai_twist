import { useEffect, useState, useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Card from 'react-bootstrap/Card';
import { run as runHolder } from 'holderjs';
import { useNavigate } from 'react-router-dom';
import { useGetCategoryInfo } from '../../hooks';
import './MinorCategory.scss';

const MinorCategory = ({ category, delay }) => {
  const [enabled, setEnabled] = useState(false);
  const { categoryInfo, isSuccess } = useGetCategoryInfo({
    code: category.code,
    pg: 1,
    srt: 'I',
  });

  useEffect(() => {
    setTimeout(() => {
      setEnabled(true);
    }, delay);
  }, [delay]);

  useEffect(() => {
    runHolder({
      images: '#minor-category-img-holder',
    });
  }, []);

  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(process.env.PUBLIC_URL + '/list/' + category.code + '/I/1');
  }, [navigate, category.code]);

  return (
    <Card
      className={[
        'minor-category-card-disabled',
        enabled && 'minor-category-card-enabled',
      ].join(' ')}
      onClick={handleClick}
    >
      {isSuccess && categoryInfo.products.items[0] ? (
        <LazyLoadImage
          className="card-img-top"
          src={categoryInfo.products.items[0].image.high}
        />
      ) : (
        <Card.Img id="minor-category-img-holder" src="holder.js/100px200" />
      )}
      <Card.Body>
        <Card.Title style={{ fontSize: 'inherit' }}>{category.name}</Card.Title>
        <Card.Text style={{ fontSize: 'inherit', color: 'darkgray' }}>
          <small>{category.parent}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default MinorCategory;
