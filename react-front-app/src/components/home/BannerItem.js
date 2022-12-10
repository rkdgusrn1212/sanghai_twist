import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useGetProductListByI } from '../../hooks';

const IMG_PER_BANNER = 3; //배너 하나당 포함되는 사진 수

const BannerItem = ({category,...props}) => {
  const [banner, setBanner] = useState();
  const { productListByI, isSuccess } = new useGetProductListByI({
    code: category.code,
    pg: 1,
  });

  useEffect(() => {
    if (!isSuccess) return;
    const category = productListByI.category;
    const banner = {
      name: category.name,
      code: category.code,
      image: productListByI.products.items.map((item) => item.image),
    };
    if (banner.image.length >= IMG_PER_BANNER) {
      setBanner(banner);
    }
  }, [productListByI, isSuccess]);
  if (!isSuccess) {
    return <p>로딩중...</p>;
  }
  if (!banner) {
    return <></>;
  }
  return (
    <Carousel.Item {...props}>
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
  );
};
export default BannerItem;
