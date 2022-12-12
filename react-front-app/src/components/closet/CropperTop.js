import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './Cropper.css';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const Cropper = () => {
  const [src, selectFile] = useState(null);
  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
  };

  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: NaN });
  const [result, setResult] = useState(null);

  function getZoomImg() {}

  function getCroppedImg() {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    setResult(base64Image);
  }

  return (
    <Container>
      <Row>
        <Col className="input">
          <Form.Group
            controlId="formFile"
            className="mb-3"
            onChange={handleFileChange}
            accept="image/*"
          >
            <Form.Label>상의 선택</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Col>{' '}
      </Row>{' '}
      <Row>
        {src && (
          <Col className="originArea">
            <ReactCrop
              className="originImg"
              src={src}
              onImageLoaded={setImage}
              crop={crop}
              onChange={setCrop}
              onDragStart={getCroppedImg}
              onDragEnd={getCroppedImg}
              dragCrop={getCroppedImg}
            />
          </Col>
        )}
        {result && (
          <Col className="resultImgTop">
            <img src={result} alt="Cropped Image" className="img-fluid-top" />
          </Col>
        )}
        <Col />
      </Row>
    </Container>
  );
};

export default Cropper;
