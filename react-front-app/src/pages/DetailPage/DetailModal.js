import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap/';

function DetailModal(props) {
  const [show, setShow] = useState(true);

  console.log(props.productName[2]);
  // 모달창을 열거나 다시 열 때 사용
  if (show == false && props.productName[2] == 1) {
    setShow(true);
  }

  // 모달창을 닫을 때 사용
  const handleClose = () => {
    setShow(false);
    props.productName[2] = 0;
    localStorage.setItem('isClose', 2);
    const closeModel = localStorage.getItem('isClose');
    console.log(closeModel);
  };

  const moveShopingmall = () => {
    handleClose();
    window.open(
      `https://www.11st.co.kr/products/ + ${props.productName[1]}`,
      '_blank',
    );
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.productName[0]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>상품을 선택하셨습니다</Modal.Body>
        <Modal.Body>해당 상품 페이지로 이동하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={moveShopingmall}>
            이동하기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailModal;
