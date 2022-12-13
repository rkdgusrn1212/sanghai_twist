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


const List = () => {

    let {code, pg, srt} = useParams();

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


    if(isSuccess){
 
    return(
        <div class="container" className={styles.container}>
            <div className={styles.route}>
                <div>
                    <SlHome /> HOME > {categoryInfo.category.name}

                 </div><br />
            </div>
            <h3> Top 3</h3>
            <br />



            <div class="container">
            <div class="row">
                <div class="col-3">column1</div>
                <div class="col-3">column2</div>
                <div class="col-3">column3</div>
                <div class="col-3">column4</div>
            </div>
        </div>
      <hr />

    <div class="container">
    <div class="row">
    <div class="col-6">상품 <span className={styles.font}>{categoryInfo.products.count}</span>개</div>
    <div class="col-6"> 
    <a href={`http://${server.host}/stwist/list/${code}/I/${pg}`}> 인기순 </a>
    <TriggerExample />	
   | 낮은 가격순
   | 누적 판매순
   | 많은 리뷰순
   | 높은 평가순
   | 높은 가격순</div>
  </div>
</div>
      <div>
      <br />
      <h3> 기본 상품</h3>

      <hr />

       {categoryInfo.products.items.map((state, index) => {
        return (
         
            
            <Container >
            <div class="row" className={styles.test} key={index} products={state}>
                

                <Col className={styles.image}><img src={state.image.high} alt="product" /></Col>
                <Col className={styles.id}>{state.name}</Col>
                <Col className={styles.price}>
                    <Row className={styles.price2}>{state.price}원~</Row>
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
export default List;

