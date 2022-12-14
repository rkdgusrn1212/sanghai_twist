import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import CommonHeader from '../components/common/CommonHeader';
import Banner from '../components/home/Banner';
import CategoryGrid from '../components/home/CategoryGrid';
import CategoryTree from '../components/home/CategoryTree';

const Home = () => {
  return (
    <Stack gap={5}>
      <CommonHeader />
      <Banner />
      <Container fluid="md">
        <Stack gap={3}>
          <h1>카테고리 검색</h1>
          <hr />
          <CategoryTree />
          <h1>인기 카테고리</h1>
          <hr />
          <CategoryGrid />
        </Stack>
      </Container>
    </Stack>
  );
};

export default Home;
