import React, { useEffect, useState } from 'react';
import './Cropper.css';
import { Card, Tab, Tabs } from 'react-bootstrap';
import { useGetProductInfo } from '../../hooks';
import SideDetail from './SideDetail';

const Side = (props) => {
  let [inputValue, setInputValue] = useState('');
  let [code, setCode] = useState(null);
  const [tElem, setTElem] = useState(null);
  const [bElem, setBElem] = useState(null);
  const { productInfo, isUninitialized, isLoading, isError, isSuccess } =
    useGetProductInfo(code);
  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    props.sendTopElem(tElem);
  }, [tElem]);

  useEffect(() => {
    props.sendBotElem(bElem);
  }, [bElem]);

  function sendTElem(elem) {
    setTElem(elem);
  }
  function sendBElem(elem) {
    setBElem(elem);
  }
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
      {/* <div className="parent">
        name: <div className="todosMap">{}</div>
        <form onSubmit={onSubmit}>
          <input value={inputValue} onChange={onChange}></input>
          <button>저장</button> 
        </form>
      </div> */}
      <div className="Side">
        <Tabs defaultActiveKey="home" id="sideDetail" className="mb-4" fill>
          <Tab eventKey="home" title="상의">
            {JSON.parse(localStorage.getItem('topList')) &&
              JSON.parse(localStorage.getItem('topList')).map((elem) => (
                <Card
                  key={elem}
                  id={elem}
                  className="cards"
                  onClick={() => sendTElem(elem)}
                >
                  <SideDetail elem={elem} />
                </Card>
              ))}
          </Tab>
          <Tab eventKey="profile" title="하의">
            {JSON.parse(localStorage.getItem('bottomList')) &&
              JSON.parse(localStorage.getItem('bottomList')).map((elem) => (
                <Card
                  key={elem}
                  id={elem}
                  className="cards"
                  onClick={() => sendBElem(elem)}
                >
                  <SideDetail elem={elem} />
                </Card>
              ))}
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Side;
