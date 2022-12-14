import Carousel from 'react-bootstrap/Carousel';
import Badge from 'react-bootstrap/Badge';
import styled from 'styled-components';
import { useState, useEffect, forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useGetCategoryInfo } from '../../hooks';

const IMG_PER_BANNER = 3; //배너 하나당 포함되는 사진 수

const BannerItemTitle = styled.a`
  font-family: cafe-classic, serif;
  text-decoration: none;
  font-size: 32px;
  color: #ffffff;
  &:hover {
    font-size: 40px;
    color: #FFE0B2;
  }
`;

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

  return (
    isSuccess &&
    content && (
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
          <BannerItemTitle>
            <Badge style={{color:'inherit'}} pill bg="dark">
              {content.name}
            </Badge>
          </BannerItemTitle>
        </Carousel.Caption>
      </Carousel.Item>
    )
  );
};
export default forwardRef(BannerItem);
