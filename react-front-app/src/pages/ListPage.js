import React, { useState, useEffect } from 'react';
import { SlHome } from 'react-icons/sl';
import { BsCartCheckFill } from 'react-icons/bs';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import TriggerExample from './Listcat/popover';
import server from '../server.json';
import Banner from './Listcat/bannerFun';
import styles from './list.module.css';
import { useParams } from 'react-router-dom';
import { useGetCategoryInfo } from '../hooks';

const ListPage = () => {
  const { code, pg, srt } = useParams();

  const { categoryInfo, isUninitialized, isLoading, isError, isSuccess } =
    new useGetCategoryInfo({
      code: code,
      pg: pg,
      srt: srt,
    });

  // console.log(categoryInfo)

  const [data, setData] = useState([]);
  let copy = [];
  //console.log(data)
  let [counter, setCounter] = useState(0);

  //라이브러리 이벤트 속성과 디자인 요소 스타일링
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  //페이징 미완성

  // useEffect ( () => {
  //   console.log(`http://192.168.0.115:8080/stwist-api/category/${code}?size=12&pg=${counter}&srt=${srt}`)
  //   axios.get(`http://192.168.0.115:8080/stwist-api/category/${code}?size=12&pg=${counter}&srt=${srt}`)
  //   .then((response) => {
  //     console.log(counter)
  //     console.log('받아오는 데이터값')
  //     console.log(response.data.products.items);
  //     console.log(data);

  //     if(!data){
  //       let copy = [...data, ...response.data.products.items];
  //     }else{
  //       let copy = [...response.data.products.items];
  //     }

  //     setData(copy);
  //   })
  //   // .catch ( () => {console.log('데이터 전송 실패')})
  // },[counter])

  //숫자 컴마 정규화식
  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (isSuccess) {
    //console.log(categoryInfo.products.items)
    return (
      <div class="container" className={styles.container}>
        <div className={styles.background}>
          <Banner />
        </div>
        <div className={styles.banner}>S,TWIST</div>
        <div className={styles.bannerimg}></div>
        <hr />
        <div>
          <SlHome /> HOME > {categoryInfo.category.name}
        </div>
        <br />
        <br />

        <div class="container">
          <div class="row">
            <div class="col-6">
              상품{' '}
              <span className={styles.font}>
                {convertPrice(categoryInfo.products.count)}
              </span>
              개
            </div>
            <div class="col-6">
              <a href={`/stwist/list/${code}/CP/1`}> 인기순 </a>
              <TriggerExample />|
              <a href={`/stwist/list/${code}/L/1`}> 낮은 가격순 </a>|{' '}
              <a href={`/stwist/list/${code}/A/1`}> 누적 판매순 </a>|{' '}
              <a href={`/stwist/list/${code}/I/1`}> 많은 리뷰순 </a>|{' '}
              <a href={`/stwist/list/${code}/G/1`}> 높은 평가순 </a>|{' '}
              <a href={`/stwist/list/${code}/H/1`}> 높은 가격순 </a>{' '}
            </div>
          </div>
        </div>
        <div>
          <br />
          <h3> 기본 상품</h3>

          <hr />

          {categoryInfo.products.items.map((state, index) => {
            return (
              <Container>
                <div
                  class="row no-gutters"
                  className={styles.test}
                  key={index}
                  products={state}
                >
                  <Col className={styles.image}>
                    <img src={state.image.high} alt="product" />
                  </Col>
                  <Col className={styles.id}>
                    <a href={`/stwist/detail/${code}`}> {state.name} </a>
                  </Col>
                  <Col className={styles.price}>
                    <Row className={styles.price2}>
                      {convertPrice(state.price)}원~
                    </Row>
                    <Row className={styles.price3}>
                      {' '}
                      <div>
                        <BsCartCheckFill /> 무료배송{' '}
                      </div>
                    </Row>
                  </Col>
                  <Col className={styles.provider}>{state.code}</Col>
                </div>
                <hr />
              </Container>
            );
          })}

          <div className={styles.buttons}>
            {' '}
            <Button
              type="button"
              class="primary"
              onClick={() => setCounter(counter + 1)}
            >
              ㅤ˅ㅤ
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1> 로딩 중 ••••</h1>;
  }
};

export default ListPage;
