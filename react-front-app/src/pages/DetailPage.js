import { Card, Button, Dropdown } from 'react-bootstrap/';
import { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Banner from '../components/home/Banner';
import { useGetProductInfo } from '../hooks';
import CommonHeader from '../components/common/CommonHeader';

const Detail = () => {
  let { code } = useParams();
  const { productInfo, isUninitialized, isLoading, isError, isSuccess } =
    useGetProductInfo(code);
  console.log(code);
  console.log(productInfo);

  const numbers = productInfo.optionList[0].values;
  console.log(numbers);

  const listItems = numbers.map((number, index) => (
    <Dropdown.Item key={index}>{number.name}</Dropdown.Item>
  ));
  console.log(listItems);
  if (
    productInfo.code === undefined ||
    productInfo.length === 0 ||
    productInfo.exist === 'N'
  ) {
    return (
      <>
        <CommonHeader />
        <div>
          <h3>해당 상품은 존재하지 않거나 품절되었습니다.</h3>
        </div>
      </>
    );
  } else {
    return (
      <>
        <CommonHeader />
        <Banner />

        <Card style={{ width: '30rem', margin: 'auto' }}>
          <Card.Img variant="top" src={productInfo.image} />
          <Card.Body style={{ float: 'left' }}>
            <Card.Title>{productInfo.name}</Card.Title>
            <Card.Text>{productInfo.price.origin}</Card.Text>
            <Card.Text>{productInfo.shipFee}</Card.Text>
          </Card.Body>
          <Button variant="primary">담기</Button>
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

  //   return (
  //     <>
  //       <CommonHeader />
  //       <div>
  //         <h3>해당 상품은 존재하지 않거나 품절되었습니다.</h3>
  //       </div>
  //     </>
  //   );
};
export default Detail;
