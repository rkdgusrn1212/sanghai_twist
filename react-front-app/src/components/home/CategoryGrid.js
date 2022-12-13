import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { useGetCategoryList } from '../../hooks';
import MajorCategory from './MajorCategory';
import CategoryTree from './CategoryTree';

const CategoryGrid = () => {
  const { categoryList, isSuccess } = useGetCategoryList();
  return (
    <Container fluid="lg">
      <div style={{ height: 50 }} />
      <CategoryTree
        data={isSuccess && categoryList}
        onClickItem={({ key, name, ...props }) => {
          this.navigate(props.url);
        }}
        debounceTime={125}
      />
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
