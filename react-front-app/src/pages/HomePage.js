import CommonHeader from '../components/common/CommonHeader';
import Banner from '../components/home/Banner';
import CategoryGrid from '../components/home/CategoryGrid';
import CategoryFixed from '../components/home/CategoryFixed';

const Home = () => {
  return (
    <>
      <CommonHeader />
      <Banner />
      <CategoryGrid />
      <CategoryFixed/>
    </>
  );
};

export default Home;
