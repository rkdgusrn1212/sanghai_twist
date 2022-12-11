import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useGetCategoryList } from '../../hooks';

const CategoryGrid = () => {
  const { categoryList, isError, isLoading } = useGetCategoryList();

  return (
    <Container fluid="lg">
      <Row className="justify-content-center">
        <Col md="6">{JSON.stringify(categoryList)}</Col>
        <Col md="6">{isError && 'ERROR'}</Col>
        <Col md="6">{isLoading && 'Loading'}</Col>
      </Row>
    </Container>
  );
};
export default CategoryGrid;
