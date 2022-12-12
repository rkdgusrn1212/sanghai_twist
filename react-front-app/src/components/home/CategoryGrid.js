import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useGetCategoryList } from '../../hooks';
import MajorCategory from './MajorCategory';
import TopCategory from './TopCategory';
import PantsCategory from './PantsCategory';

const CategoryGrid = () => {
  const { categoryList, isSuccess } = useGetCategoryList();

  return (
    <Container fluid="lg">
      {isSuccess && [(
        <Row className="justify-content-center">
          <Col className="text-center">
            <TopCategory category={categoryList.top} />
          </Col>
        </Row>),(
        <Row className="justify-content-center">
          <Col className="text-center">
            <PantsCategory category={categoryList.pants} />
          </Col>
        </Row>
      )]}
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
