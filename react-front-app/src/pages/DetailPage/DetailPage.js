import { Card, Button, Dropdown, Spinner, Container } from 'react-bootstrap/';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Banner from '../../components/home/Banner';
import { useGetProductInfo } from '../../hooks';
import CommonHeader from '../../components/common/CommonHeader';
import StarRate from '../../components/common/useSetStar';
import DetailModal from '../DetailPage/DetailModal';

const Detail = () => {
  let { code, isTop } = useParams();
  const { productInfo, isUninitialized, isLoading, isError, isSuccess } =
    useGetProductInfo(code); // 상품을 가져오는 훅

  let [data, setData] = useState(false); // 하위 컴포넌트(DetailModal)를 적용하기 위한 분기 조건
  let [productName, setProductName] = useState(''); // 옵션보기에서 선택한 상품 정보

  // 옵션 선택시 발생하는 클릭 이벤트 핸들러 함수
  function MoveShopPage(props) {
    MoveShop(props);
  }

  let closeModel = 0;
  // 옵션 선택한 상품의 이름을 담는 함수
  function MoveShop(props) {
    if (props != undefined) {
      setData(true);
      setProductName(props);
    }
    if (closeModel == 2) {
      console.log(closeModel);
      localStorage.setItem('isClose', 1);
    }
    closeModel = localStorage.getItem('isClose');
    console.log(closeModel);
    console.log(productName);
  }

  // LocalStorage에 상의 하의를 구분하여 담아주는 함수
  function PutDataToLocal(props) {
    if (isTop == 0) {
      const rawTopVal = localStorage.getItem('topList');
      console.log(rawTopVal);
      console.log(props);
      if (!rawTopVal) {
        localStorage.setItem('topList', JSON.stringify([props]));
      } else {
        const decoded = JSON.parse(rawTopVal);
        if (!rawTopVal.includes(props)) {
          alert(`${props}번 상품이 담겼습니다.`);
          localStorage.setItem('topList', JSON.stringify([...decoded, props]));
        }
      }
    } else {
      const rawBottomVal = localStorage.getItem('bottomList');
      console.log(rawBottomVal);
      if (!rawBottomVal) {
        localStorage.setItem('bottomList', JSON.stringify([props]));
      } else {
        const decoded = JSON.parse(rawBottomVal);
        if (!rawBottomVal.includes(props)) {
          alert(`${props}번 상품이 담겼습니다.`);
          localStorage.setItem(
            'bottomList',
            JSON.stringify([...decoded, props]),
          );
        }
      }
    }
  }

  if (isSuccess === false) {
    return (
      <>
        <CommonHeader />
        <Div>
          <Spinner style={{}} animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Div>
      </>
    );
  } else {
    let kindProduct = '';
    if (isTop == 0) kindProduct = '상의';
    else kindProduct = '하의';

    const numbers = productInfo.optionList[0].values;

    const listItems = numbers.map((number, index) => (
      <Dropdown.Item key={index} onClick={() => MoveShopPage(number.name)}>
        {number.name}
      </Dropdown.Item>
    ));
    return (
      <>
        <CommonHeader />
        <Banner />
        <Container fluid="md">
          <MarginBottom />
          <h1>상품 상세 페이지</h1>
          <hr />
          <MarginBottom />
          <Card style={{ width: '30rem', margin: 'auto' }}>
            <Card.Img variant="top" src={productInfo.image} />
            <StarRate data={productInfo.satisfaction} />
            <Card.Body style={{ float: 'left' }}>
              <Card.Title>{productInfo.name}</Card.Title>
              <Card.Text>가격 : {productInfo.price.origin}</Card.Text>
              <Card.Text>배송비 : {productInfo.shipFee}</Card.Text>
            </Card.Body>
            <Button
              variant="primary"
              onClick={() => PutDataToLocal(productInfo.code)}
            >
              {kindProduct}담기
            </Button>
            <div>
              {data === true && productName !== undefined ? (
                <DetailModal productName={[productName, code, closeModel]} />
              ) : null}
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                옵션보기
              </Dropdown.Toggle>
              <Dropdown.Menu>{listItems}</Dropdown.Menu>
            </Dropdown>
          </Card>
        </Container>
      </>
    );
  }
};

export { Detail };

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  top: 40vh;
`;
const MarginBottom = styled.div`
  margin-bottom: 50px;
`;
