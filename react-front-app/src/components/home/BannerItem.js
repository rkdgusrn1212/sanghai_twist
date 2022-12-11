import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { useState, useEffect, forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useGetCategoryInfo } from '../../hooks';

const IMG_PER_BANNER = 3; //배너 하나당 포함되는 사진 수

const BannerItem = ({ category, ...prop }, ref) => {
  const [content, setContent] = useState();
  const { categoryInfo, isSuccess } = new useGetCategoryInfo({
    code: category.code,
    pg: 1,
    srt: 'I',
  });

  useEffect(() => {
    if (!isSuccess) return;
    const category = categoryInfo.category;
    const tempContent = {
      name: category.name,
      code: category.code,
      image: categoryInfo.products.items.map((item) => item.image),
    };
    if (tempContent.image.length >= IMG_PER_BANNER) {
      tempContent.image = tempContent.image.slice(0, IMG_PER_BANNER);
      setContent(tempContent);
    }
  }, [categoryInfo, isSuccess, setContent]);
  if (!isSuccess) {
    return <p>로딩중...</p>;
  }
  if (!content) {
    return <></>;
  }
  return (
    <Carousel.Item {...prop} ref={ref}>
      <div className="d-flex justify-content-center w-100">
        {content.image.map((img, i) => (
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
      <Carousel.Caption ref={ref}>
        <h3>{content.name}</h3>
        <Link to={'list?code=' + content.code}>상품 보러가기</Link>
      </Carousel.Caption>
    </Carousel.Item>
  );
};
export default forwardRef(BannerItem);
