import CommonHeader from '../components/common/CommonHeader';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  const [bannerImgs, setBannerImgs] = new useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://192.168.0.115:8080/stwist-api/category',
      responseType: 'JSON',
    }).then((res) => {
      const tempBannerImgs = [];
      console.log(res);
    });
  }, []);

  return (
    <>
      <CommonHeader />
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=First slide&bg=373940"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Home;
