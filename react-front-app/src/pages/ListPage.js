import { useParams } from 'react-router-dom';
import { useGetCategoryInfo } from '../hooks';
import styles from "./list.module.css";
import React, { useState, useEffect } from "react";
import { SlHome} from "react-icons/sl";
import { BsCartCheckFill } from "react-icons/bs";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TriggerExample from './function';
import server from '../server.json';



const ListPage = () => {

    const {code, pg, srt} = useParams();

    const {categoryInfo, isUninitialized, isLoading, isError, isSuccess} = new useGetCategoryInfo({

    code : code,
    pg : pg,
    srt : srt,
});

//페이징

//console.log(code)
// console.log(categoryInfo.products.count)
//console.log(categoryInfo)
//isSuccess&&

//정규화식
const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  

    if(isSuccess){
 
    return(
        <div class="container" className={styles.container}>
            <div className={styles.route}>
                <div>
                    <SlHome /> HOME > {categoryInfo.category.name}

                 </div><br />
            </div><br/>

    <div class="container">
    <div class="row">
    <div class="col-6">상품 <span className={styles.font}>{convertPrice(categoryInfo.products.count)}</span>개</div>
    <div class="col-6">
    <a href={`/stwist/list/${code}/CP/1`}> 인기순 </a>
    <TriggerExample />	
   | <a href={`/stwist/list/${code}/L/1`}> 낮은 가격순 </a>
   | <a href={`/stwist/list/${code}/A/1`}> 누적 판매순 </a>
   | <a href={`/stwist/list/${code}/I/1`}> 많은 리뷰순 </a>
   | <a href={`/stwist/list/${code}/G/1`}> 높은 평가순 </a>
   | <a href={`/stwist/list/${code}/H/1`}> 높은 가격순 </a> </div>
  </div>
</div>
      <div>
      <br />
      <h3> 기본 상품</h3>

      <hr />

       {categoryInfo.products.items.map((state, index) => {
        return (
         
            
            <Container >
            <div class="row no-gutters" className={styles.test} key={index} products={state}>

                <Col className={styles.image}><img src={state.image.high} alt="product" /></Col>
                <Col className={styles.id}>
                <a href={`/stwist/detail/${code}`}> {state.name} </a></Col>
                <Col className={styles.price}>
                    <Row className={styles.price2}>{convertPrice(state.price)}원~</Row>
                    <Row className={styles.price3}>  <div><BsCartCheckFill/> 무료배송 </div></Row>
                </Col>
                <Col className={styles.provider}>{state.code}</Col> 

            </div>
            <hr />
            </Container>
        );
       })} 
        {<div className={styles.button}><button type="button" class="btn btn-secondary btn-sm">ㅤ˅ㅤ</button></div> }
         </div>
    </div>
    )
    }else {
        return <h1> 로딩 중 ••••</h1>
    }

    }
export default ListPage;

