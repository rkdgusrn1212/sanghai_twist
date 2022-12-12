import { Carousel, Container, Card, Button } from 'react-bootstrap/';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CommonHeader from '../components/common/CommonHeader';

const Detail = (props) => {
  //   const [bannerImgs, setBannerImgs] = new useState([]);
  //   const code = props.match.params.code;
  //   const dispatch = useDispatch();
  //   const prd_list = useSelector((state) => state.prd.prd_list);

  //   let { params } = useParams();
  let params = 2415488159;
  console.log(props.code);
  // 자바스크립트 find라는 ES6신문법 활용해서 Array안에서 원하는 자료를 뽑아서 변수에 담기
  let detailProduct = props.code.find(function (product) {
    return (product.params = params);
  });

  //   useEffect(() => {
  //     axios({
  //       method: 'get',
  //       url: 'http://192.168.0.115:8080/stwist-api/category',
  //       responseType: 'json',
  //     }).then((res) => {
  //       let images = [];
  //       let catList = res.data;
  //       Promise.all(catList.map((cat) => axios({})));
  //     });
  //   });

  //   useEffect(() => {
  //     axios
  //       .get(`http://192.168.0.115:8080/stwist-api/product/${params}`)
  //       .then((response) => {
  //         if (response.data.success) {
  //           console.log(response.data);
  //         } else {
  //           alert('실패');
  //         }
  //       });
  //   }, []);
  return (
    <>
      <CommonHeader />
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>상품이름</Card.Title>
          <Card.Text>상품가격</Card.Text>
          <Button variant="primary">버튼</Button>
        </Card.Body>
      </Card>
    </>
  );
};
// react-elastic-carousel
export default Detail;
