import React, { useEffect, useState } from 'react';
import './Cropper.css';
import { Nav, Row } from 'react-bootstrap';
import { useGetProductInfo } from '../../hooks';
import { render } from 'react-dom';
import { element } from 'prop-types';

const Side = () => {
  const [resultTop, setResultTop] = useState([]);
  let [inputValue, setInputValue] = useState('');
  let [code, setCode] = useState(null);

  const { productInfo, isUninitialized, isLoading, isError, isSuccess } =
    useGetProductInfo(code);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
    setInputValue('');
    const rawVal = localStorage.getItem('topList');
    if (!rawVal) {
      localStorage.setItem('topList', JSON.stringify([inputValue]));
    } else {
      const decoded = JSON.parse(rawVal);
      localStorage.setItem('topList', JSON.stringify([...decoded, inputValue]));
    }
  };

  return (
    <>
      <div className="parent">
        name: <div className="todosMap">{}</div>
        <form onSubmit={onSubmit}>
          <input value={inputValue} onChange={onChange}></input>
          <button>저장</button>
        </form>
      </div>
      <div className="Side">
        <Nav justify variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link eventKey="link-1" /*href="/home"*/>상의</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">하의</Nav.Link>
          </Nav.Item>
        </Nav>
        {JSON.parse(localStorage.getItem('topList')).map((elem, i) => (
          <div key={i}>
            <h2>{elem}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Side;
