import { useGetCategoryInfo } from '../../hooks';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import ProductListItem from './ProductListItem';

const ProductList = ({ code, pg, srt }) => {
  const { categoryInfo } = new useGetCategoryInfo({
    code: code,
    pg: pg,
    srt: srt,
  });
  if (!categoryInfo) {
    return (
      <div className="d-flex justify-content-center pt-5 pb-5">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }
  return (
    <ListGroup>
      {categoryInfo.products.items.map((item) => (
        <ProductListItem key={item.code} product={item} />
      ))}
    </ListGroup>
  );
};
export default ProductList;
