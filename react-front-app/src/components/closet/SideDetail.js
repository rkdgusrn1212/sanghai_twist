import React, { useEffect, useState } from 'react';
import './Cropper.css';
import { Button } from 'react-bootstrap';
import { useGetProductInfo } from '../../hooks';
import { useParams } from 'react-router-dom';
import Trash from '../closet/trash.png';
import Cart from '../closet/cart.png';
import Del from '../closet/DeleteModal';
function SideDetail(props) {
  const { productInfo, isUninitialized, isLoading, isError, isSuccess } =
    useGetProductInfo(props.elem);
  const moveShoppingmall = () => {
    window.open(`https://www.11st.co.kr/products/ + ${props.elem}`, '_blank');
  };
  const deleteStorage = () => {
    console.log(props.elem);
    localStorage.removeItem(props.elem);
  };
  if (isSuccess === false) {
    return (
      <>
        <div>
          <h3>해당 상품에 접속중입니다.</h3>
        </div>
      </>
    );
  } else {
    return (
      <div className="cards">
        <div className="btnArea">
          <img
            className="btnGo"
            src={Cart}
            style={{ width: '40px' }}
            onClick={moveShoppingmall}
          />
          <img
            className="btnDel"
            src={Trash}
            style={{ width: '40px' }}
            onClick={deleteStorage}
          />
        </div>
        <img src={productInfo.image} style={{ width: '250px' }} />
        <h6>{productInfo.name}</h6>
      </div>
    );
  }
}

export default SideDetail;
