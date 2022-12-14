import { Card, Button, Dropdown, Alert } from 'react-bootstrap/';
import { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Banner from '../components/home/Banner';
import { useGetProductInfo } from '../hooks';
import CommonHeader from '../components/common/CommonHeader';
import StarRate from '../components/common/useSetStar';

function MoveShopPage(props) {
  console.log(props);
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}

const Detail = () => {
  let { code, isTop } = useParams();
  const { productInfo, isUninitialized, isLoading, isError, isSuccess } =
    useGetProductInfo(code);
  console.log(isTop);
  console.log(code);
  console.log(productInfo);
  console.log(isSuccess);

  // let [state, setState] = useState(true);

  // setState = isSuccess;
  // console.log(state);

  // useEffect(() => {
  if (isSuccess === false) {
    return (
      <>
        <CommonHeader />
        <div>
          <h3>해당 상품은 존재하지 않거나 품절되었습니다.</h3>
        </div>
      </>
    );
  } else {
    let kindProduct = '';
    if (isTop == 0) kindProduct = '상의';
    else kindProduct = '하의';

    const numbers = productInfo.optionList[0].values;
    console.log(numbers);

    const listItems = numbers.map((number, index) => (
      <Dropdown.Item key={index} onClick={() => MoveShopPage(number.name)}>
        {number.name}
      </Dropdown.Item>
    ));
    console.log(listItems);
    return (
      <>
        <CommonHeader />
        <Banner />
        <Card style={{ width: '30rem', margin: 'auto' }}>
          <Card.Img variant="top" src={productInfo.image} />
          <StarRate data={productInfo.satisfaction} />
          <Card.Body style={{ float: 'left' }}>
            <Card.Title>{productInfo.name}</Card.Title>
            <Card.Text>{productInfo.price.origin}</Card.Text>
            <Card.Text>{productInfo.shipFee}</Card.Text>
          </Card.Body>
          <Button variant="primary">{kindProduct}담기</Button>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              옵션보기
            </Dropdown.Toggle>
            <Dropdown.Menu>{listItems}</Dropdown.Menu>
          </Dropdown>
        </Card>
      </>
    );
  }
  // });
};

export default Detail;
