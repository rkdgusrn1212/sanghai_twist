import React, { useEffect, useState } from 'react';
import './Cropper.css';
import { Nav, Row } from 'react-bootstrap';
import { useGetProductInfo } from '../../hooks';
import { useParams } from 'react-router-dom';

function SideDetail(props) {
  const { productInfo, isUninitialized, isLoading, isError, isSuccess } =
    useGetProductInfo(props.elem);

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
      <div>
        <img src={productInfo.image} style={{ width: '250px' }} />
        <h6>
          {productInfo.name};{props.elem}
        </h6>
      </div>
    );
  }
}

export default SideDetail;
