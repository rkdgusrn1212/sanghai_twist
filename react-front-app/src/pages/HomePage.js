import CommonHeader from '../components/common/CommonHeader';
import Container from 'react-bootstrap/Container';
import Banner from '../components/page/Banner';

const Home = () => {
  return (
    <>
      <CommonHeader />
      <Banner />
      <Container fluid="lg">
      </Container>
    </>
  );
};

export default Home;
