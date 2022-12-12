import React from 'react';
import '../components/closet/Cropper.css';
import CropperTop from '../components/closet/CropperTop';
import CropperBottom from '../components/closet/CropperBottom';
import Side from '../components/closet/Side';
import { Container, Row, Col } from 'react-bootstrap';

function Closet() {
  return (
    <div className="Clset">
      <Container>
        <Row xs={1} md={2}>
          <Col>
            <Col>
              <CropperTop />
            </Col>
            <Col>
              <CropperBottom />
            </Col>
          </Col>
          <Col>
            <Side />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Closet;
