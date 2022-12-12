import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useGetCategoryList } from '../../hooks';
import MajorCategory from './MajorCategory';

const CategoryGrid = () => {
  const { categoryList, isSuccess } = useGetCategoryList();

  return (
    <Container fluid="lg">
      <Row className="justify-content-center">
        {isSuccess ? (
          categoryList.categories.map((category) => (
            <Col md="6" key={category.code}>
              <MajorCategory category={category}></MajorCategory>
            </Col>
          ))
        ) : (
          <Spinner animation="grow" />
        )}
      </Row>
    </Container>
  );
};
export default CategoryGrid;
