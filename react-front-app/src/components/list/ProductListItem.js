import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsCartCheckFill } from 'react-icons/bs';
import styles from './ProductListItem.module.css';
import { useMemo } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import convertPrice from './convertPrice';

const ProductListItem = ({ product }) => {
  //숫자 컴마 제거
  const convertedPrice = useMemo(
    () => convertPrice(product.price),
    [product.price],
  );

  return (
    <ListGroup.Item style={{ border: 'none' }}>
      <Row>
        <Col className={styles.image}>
          <img src={product.image.high} alt="product" />
        </Col>
        <Col className={styles.id}>
          <a href={process.env.PUBLIC_URL + '/detail/' + product.code}>
            {' '}
            {product.name}{' '}
          </a>
        </Col>
        <Col className={styles.price}>
          <Row className={styles.price2}>{convertedPrice}원~</Row>
          <Row className={styles.price3}>
            {' '}
            <div>
              <BsCartCheckFill /> 무료배송{' '}
            </div>
          </Row>
        </Col>
        <Col className={styles.provider}>{product.code}</Col>
      </Row>
      <hr />
    </ListGroup.Item>
  );
};
export default ProductListItem;
