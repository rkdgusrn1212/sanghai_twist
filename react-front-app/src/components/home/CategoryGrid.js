import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useGetAllCategory} from '../../hooks';
import {useEffect} from 'react';

const CategoryGrid = () => {
  const { categories, isError, isLoading } = useGetAllCategory();

  return (
    <Container fluid="lg">
      <Row className="justify-content-center">
        <Col md="6">{JSON.stringify(categories)}</Col>
        <Col md="6">{isError && 'ERROR'}</Col>
        <Col md="6">{isLoading && 'Loading'}</Col>
      </Row>
    </Container>
  );
};
export default CategoryGrid;
