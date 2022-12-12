import { LazyLoadImage } from 'react-lazy-load-image-component';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';
import { useGetCategoryInfo } from '../../hooks';
import 'holderjs';

const MajorCategory = ({ category }) => {
  const { categoryInfo, isSuccess } = 
  useGetCategoryInfo({
    code: category.code,
    pg: 1,
    srt: 'I',
  });

  return isSuccess ? (
    <Card>
      <LazyLoadImage
        className="card-img-top"
        src={categoryInfo.products.items[0].image.high}
      ></LazyLoadImage>
      <Card.Body>
        <Card.Title>{categoryInfo.category.name}</Card.Title>
        <Card.Text>{categoryInfo.category.child} </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  ) : (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" data-src="holder.js/100px300"></Card.Img>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={6} />
      </Card.Body>
    </Card>
  );
};
export default MajorCategory;
