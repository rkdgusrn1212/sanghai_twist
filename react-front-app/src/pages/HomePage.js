import CommonHeader from '../components/common/CommonHeader';
import Banner from '../components/home/Banner';
import CategoryGrid from '../components/home/CategoryGrid';
import CategoryFixed from '../components/home/CategoryFixed';
import CategoryTree from '../components/home/CategoryTree';

const Home = () => {
  return (
    <>
      <CommonHeader />
      <Banner />
      <CategoryTree/>
      <CategoryGrid />
      <CategoryFixed />
    </>
  );
};

export default Home;
