import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Wrapper = styled.div`
  height: 400px;
`;
const Image = styled.img`
  height: 400px;
  width: 800px;
  object-fit: fill;
`;

export default function BannerUI() {
  const settings = {
    //dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    vertical : true
  };
  return (
    <Wrapper>
      {/* ...settings: 위의 객체 내용이 들어옴 */}
      <Slider {...settings}>
        <div> 
           월,수,금 7시 업데이트! ▶
        </div>
        <div>
        ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
        </div>
        <div>
        S,TWIST에 오신것을 환영합니다.🐹
        </div>

        <div>
   
        </div>
      </Slider>
    </Wrapper>
  );
}