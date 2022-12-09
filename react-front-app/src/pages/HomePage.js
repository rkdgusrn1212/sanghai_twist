import CommonHeader from '../components/common/CommonHeader';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useState, useEffect } from 'react';

const IMG_PER_BANNER = 3; //배너 하나당 포함되는 사진 수

const Home = () => {
  console.log('sdaf');
  const [bannerImgs, setBannerImgs] = new useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://192.168.0.115:8080/stwist-api/category',
      responseType: 'json',
    })
      .then((res) => {
        let images = [];
        let catList = res.data;
        Promise.all(
          catList.map(
            (cat) =>
              axios({
                method: 'get',
                url: `http://192.168.0.115:8080/stwist-api/category/${cat.code}`,
                responseType: 'json',
              }).then((res) => {
                const items = res.data.products.items;
                items && images.push(items.map((item) => item.image));
              }), //items가 없는 카테고리도 있음, BANNER를 꽉 체울 크기인 것들만 집어넣음.
          ),
        ).then(() => {
          const len = images.length; //3개 안되는 이미지는 배너로 안씀.
          const bannerCnt = Math.floor(len / IMG_PER_BANNER);
          let banners = new Array(bannerCnt);
          for (let bIdx = 0; bIdx < bannerCnt; bIdx++) {
            const inBanner = new Array(IMG_PER_BANNER);
            let baseIdx = bIdx * IMG_PER_BANNER;
            for (let iIdx = 0; iIdx < IMG_PER_BANNER; iIdx++) {
              inBanner.push(images[baseIdx++]);
            }
            banners[bIdx] = inBanner;
          }
          setBannerImgs(banners);
        });
      })
      .catch((e) => console.log(e));
  }, [setBannerImgs]);

  return (
    <>
      <CommonHeader />
      <Container fluid="lg" />
      <Carousel>
        {bannerImgs.map((imgs, i) => (
          <Carousel.Item key={i}>
            <div className="d-flex justify-content-center w-100">
              {imgs.map((img, i) => (
                <img
                  src={img}
                  key={i}
                  alt="First slide"
                  width="300"
                  height="300"
                />
              ))}
            </div>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default Home;
