import { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Card from 'react-bootstrap/Card';
import { run as runHolder } from 'holderjs';
import { useGetCategoryInfo } from '../../hooks';

const cardStyle = {
  width: 300,
  marginTop : 10,
  marginLeft : 5,
  marginRight : 5
}

const MajorCategory = ({ category }) => {
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

  return (
    <Card style={cardStyle}>
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
