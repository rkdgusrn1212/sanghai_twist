import Carousel from 'react-bootstrap/Carousel';
import { useGetCategoryList } from '../../hooks';
import BannerItem from './BannerItem';

const Banner = () => {
  const { categoryList, isSuccess } = new useGetCategoryList();

  return (
    isSuccess && (
      <Carousel>
        {categoryList.categories.map((category) => (
          <BannerItem category={category} key={category.code} />
        ))}
      </Carousel>
    )
  );
};
export default Banner;
