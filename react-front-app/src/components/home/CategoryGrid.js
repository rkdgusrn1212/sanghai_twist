import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useGetCategoryList } from '../../hooks';
import MajorCategory from './MajorCategory';
import TopCategory from './TopCategory';

const CategoryGrid = () => {
  const { categoryList, isSuccess } = useGetCategoryList();

  return (
    <Container fluid="lg">
      <Row className="justify-content-center">
      {isSuccess && (
        <Col className="text-center">
          <TopCategory category={categoryList.top}/>
        </Col>)}
      </Row>
      <Row className="justify-content-center">
        <Col className="d-flex justify-content-around">
          {isSuccess ? (
            categoryList.categories.map((category) => (
              <MajorCategory category={category} key={category.code} />
            ))
          ) : (
            <Spinner animation="grow" />
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default CategoryGrid;
