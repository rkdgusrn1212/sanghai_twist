import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Banner from '../components/home/Banner';
import CategoryGrid from '../components/home/CategoryGrid';
import CategoryTree from '../components/home/CategoryTree';

const Home = () => {
  const [searchParams] = useSearchParams();
  
  return (
    <Stack gap={5}>
      <CommonHeader active="" />
      <Banner />
      <Container fluid="md" className="mb-5">
        <Stack gap={5}>
          <Stack>
            <h1>카테고리 검색</h1>
            <hr />
            <CategoryTree initialSearchTerm={searchParams.get('kwd')} />
          </Stack>
          <Stack>
            <h1>인기 카테고리</h1>
            <hr />
            <CategoryGrid />
          </Stack>
        </Stack>
      </Container>
      <CommonFooter />
    </Stack>
  );
};

export default Home;
