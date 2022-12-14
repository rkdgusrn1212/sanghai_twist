import React, { useEffect, useState } from 'react';
import './Cropper.css';
import { Card, Tab, Tabs } from 'react-bootstrap';
import { useGetProductInfo } from '../../hooks';

const Side = () => {
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
  function TabContent({ clickTab }) {
    let [fade, setFade] = useState('');
    useEffect(() => {
      setTimeout(() => {
        setFade('end');
      }, 10);
      return () => {
        setFade('');
      };
    }, [clickTab]);
  }
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
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="상의">
            {JSON.parse(localStorage.getItem('topList')) &&
              JSON.parse(localStorage.getItem('topList')).map((elem, i) => (
                <Card key={elem}>
                  <h2>{elem}</h2>
                </Card>
              ))}
          </Tab>
          <Tab eventKey="profile" title="하의">
            {JSON.parse(localStorage.getItem('bottomList')) &&
              JSON.parse(localStorage.getItem('bottomList')).map((elem, i) => (
                <Card key={i}>
                  <h2>{elem}</h2>
                </Card>
              ))}
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Side;
