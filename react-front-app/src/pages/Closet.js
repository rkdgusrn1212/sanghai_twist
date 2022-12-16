import React, { useState, useEffect } from 'react';
import '../components/closet/Cropper.css';
import CropperTop from '../components/closet/CropperTop';
import CropperBottom from '../components/closet/CropperBottom';
import Side from '../components/closet/Side';
import { Container, Row, Col } from 'react-bootstrap';
import CommonHeader from '../components/common/CommonHeader';
import HowTo from '../components/closet/HowTo';
function Closet() {
  const [topElem, setTopElem] = useState(null);
  const [botElem, setBotElem] = useState(null);

  useEffect(() => {}, [topElem]);

  useEffect(() => {}, [botElem]);

  const sendTopElem = (topElem) => {
    setTopElem(topElem);
  };
  const sendBotElem = (botElem) => {
    setBotElem(botElem);
  };

  return (
    <div className="Clset">
      <CommonHeader active="/closet" />
      <Container fluid="md">
        <h1 className="closet-title">나의 옷장</h1>
        <HowTo />
        <Row xs={1} md={2}>
          <Col md={7}>
            <Col>
              <CropperTop topElem={topElem} />
            </Col>
            <Col>
              <CropperBottom botElem={botElem} />
            </Col>
          </Col>
          <Col md={5}>
            <Side sendTopElem={sendTopElem} sendBotElem={sendBotElem} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Closet;
