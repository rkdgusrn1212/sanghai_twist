import CommonHeader from '../components/common/CommonHeader';
import Container from 'react-bootstrap/Container';
import Banner from '../components/home/Banner';
import CategoryGrid from '../components/home/CategoryGrid';

const Home = () => {
  return (
    <>
      <CommonHeader />
      <Banner />
      <CategoryGrid />
    </>
  );
};

export default Home;
