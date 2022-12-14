import React, { useEffect, useState } from 'react';
import './Cropper.css';
import { Nav, Row } from 'react-bootstrap';

const Side = () => {
  const [items, setItems] = useState([]);
  let [inputValue, setInputValue] = useState('');
  let [id, setId] = useState({ code: '' });

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  //inputValue가 변하면, 그때 newTodo값을 바꿔주자
  useEffect(() => setId({ code: inputValue }), [inputValue]);

  const onSubmit = (e) => {
    e.preventDefault();
    setId({ code: inputValue });
    setItems([...items, id]);
    setInputValue('');
    console.log(id);
  };

  const itemsMap = items.map((item, i) => <p key={i}>{item.name}</p>);

  //인풋에 todo값들을 입력할 때마다, localStorage에 저장한다.
  useEffect(() => {
    window.localStorage.setItem('itemList', JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="parent">
        name: <div className="todosMap">{itemsMap}</div>
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
      </div>
    </>
  );
};

export default Side;
