import { Card, Button, Dropdown, Spinner } from 'react-bootstrap/';
import { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Banner from '../../components/home/Banner';
import { useGetProductInfo } from '../../hooks';
import CommonHeader from '../../components/common/CommonHeader';
import StarRate from '../../components/common/useSetStar';
import DetailModal from '../DetailPage/DetailModal';
import { number } from 'prop-types';
import { set } from 'forever/lib/forever/cli';

const Detail = () => {
  let { code, isTop } = useParams();
  const { productInfo, isUninitialized, isLoading, isError, isSuccess } =
    useGetProductInfo(code);
  console.log(isTop);
  console.log(code);
  console.log(productInfo);
  console.log(isSuccess);

  let [data, setData] = useState(false); // 하위 컴포넌트(DetailModal)를 적용하기 위한 분기 조건
  let [productName, setProductName] = useState(); // 옵션보기에서 선택한 상품 정보
  // const [data, setData] = useState([{ code: '' }]); // 장바구니 담아진 데이터
  // let kind = '';

  function MoveShopPage(props) {
    console.log(props);
    MoveShop(props);
  }
  function MoveShop(props) {
    console.log(props);
    console.log(data);
    if (props != undefined) {
      setData(true);
      // console.log(data);
      // console.log(productName);
    }
  }

  function PutDataToLocal(props) {
    console.log(props);

    if (isTop == 0) {
      const rawTopVal = localStorage.getItem('topList');
      if (!rawTopVal) {
        localStorage.setItem('topList', JSON.stringify([props]));
      } else {
        const decoded = JSON.parse(rawTopVal);
        localStorage.setItem('topList', JSON.stringify([...decoded, props]));
      }
    } else {
      const rawBottomVal = localStorage.getItem('bottomList');
      if (!rawBottomVal) {
        localStorage.setItem('bottomList', JSON.stringify([props]));
      } else {
        const decoded = JSON.parse(rawBottomVal);
        localStorage.setItem('bottomList', JSON.stringify([...decoded, props]));
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
        <br />
        <br />
        <br />
        <Card style={{ width: '30rem', margin: 'auto' }}>
          <Card.Img variant="top" src={productInfo.image} />
          <StarRate data={productInfo.satisfaction} />
          <Card.Body style={{ float: 'left' }}>
            <Card.Title>{productInfo.name}</Card.Title>
            <Card.Text>{productInfo.price.origin}</Card.Text>
            <Card.Text>{productInfo.shipFee}</Card.Text>
          </Card.Body>
          <Button
            variant="primary"
            onClick={() => PutDataToLocal(productInfo.code)}
          >
            {kindProduct}담기
          </Button>
          <div>{data === true ? <DetailModal /> : null}</div>
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
