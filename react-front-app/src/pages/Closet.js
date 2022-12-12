import React from 'react';
import '../components/closet/Cropper.css';
import CropperTop from '../components/closet/CropperTop';
import CropperBottom from '../components/closet/CropperBottom';
import Side from '../components/closet/Side';
import { Container, Row, Col } from 'react-bootstrap';
import CommonHeader from '../components/common/CommonHeader';

function Closet() {
  return (
    <div className="Clset">
      <CommonHeader />

      <Container>
        <Row xs={1} md={2}>
          <Col md={7}>
            <Col>
              <CropperTop />
            </Col>
            <Col>
              <CropperBottom />
            </Col>
          </Col>
          <Col md={5}>
            <Side />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Closet;
