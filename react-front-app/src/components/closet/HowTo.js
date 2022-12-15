import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import step1 from '../closet/step1.jpg';
import step2 from '../closet/step2.png';

function HowTo() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShow(true)}
        style={{ width: '100px', height: '50px' }}
      >
        <span className="howText">사용법</span>
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-300w"
        aria-labelledby="example-custom-modal-styling-title"
        fullscreen="sm-down"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            나의 옷장 사용법
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>1. 비교하고싶은 옷을 선택한다</p>
          <img src={step1} className="step1" />
          <p>사진 1,2번중 하나를 선택</p>

          <p>
            2. 옷 사진중 원하는 부분을 마우스로 드래그해 크롭하고 위치를
            마우스로 조정한다
          </p>
          <img src={step2} className="step1" />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default HowTo;
