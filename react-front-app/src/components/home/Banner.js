import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const IMG_PER_BANNER = 3; //배너 하나당 포함되는 사진 수

/**
 * 해당 카테고리와 그 하위의 리프 카테고리를 리프 리스트에 추가해준다.
 * 인자의 카테고리가 리프 카테고리면 리스트에 넣고 아니면 자식 리스트에 대해 재귀 호출
 * @param {*} category 검사 대상 카테고리
 * @param {*} leafList 리프 카테고리들이 저장될 리스트
 */
const findLeafCat = (category, leafList) => {
  if (category.child) {
    for (let sub of category.child) {
      findLeafCat(sub, leafList);
    }
  } else {
    leafList.push(category);
  }
};

const Banner = () => {
  const [banners, setBanners] = new useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://192.168.0.115:8080/stwist-api/category',
      responseType: 'json',
    })
      .then((res) => {
        let banners = [];
        let catList = [];
        for (let sub of res.data.categories) {
          findLeafCat(sub, catList);
        }
        Promise.all(
          catList.map(
            (cat) =>
              axios({
                method: 'get',
                url: `http://192.168.0.115:8080/stwist-api/category/${cat.code}?size=${IMG_PER_BANNER}&srt=I`,
                responseType: 'json',
              }).then((res) => {
                const category = res.data.category;
                const banner = {
                  name: category.name,
                  code: category.code,
                  image: res.data.products.items.map((item) => item.image),
                };
                if (banner.image.length >= IMG_PER_BANNER) {
                  banners.push(banner);
                }
              }), //items가 없는 카테고리도 있음, BANNER를 꽉 체울 크기인 것들만 집어넣음.
          ),
        ).then(() => {
          setBanners(banners);
        });
      })
      .catch((e) => console.log(e));
  }, [setBanners]);

  return (
    <Carousel>
      {banners.map((banner, i) => (
        <Carousel.Item key={i}>
          <div className="d-flex justify-content-center w-100">
            {banner.image.map((img, i) => (
              <LazyLoadImage
                src={img.high} //lazyload의 low resolution img
                key={i}
                effect="blur"
                alt={i + '번 이미지'}
                width="300"
                height="300"
              />
            ))}
          </div>
          <Carousel.Caption>
            <h3>{banner.name}</h3>
            <Link to={'list?code=' + banner.code}>상품 보러가기</Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default Banner;
