import React, { useState } from 'react';
import './Cropper.css';
import { Nav, Row } from 'react-bootstrap';

function Side() {
  return (
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
  );
}

export default Side;
