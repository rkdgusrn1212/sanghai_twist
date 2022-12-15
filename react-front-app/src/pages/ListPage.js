import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SlHome } from 'react-icons/sl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Stack from 'react-bootstrap/Stack';
import TriggerExample from '../components/list/popover';
import Banner from '../components/list/BannerFun';
import styles from './list.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCategoryInfo } from '../hooks';
import ProductList from '../components/list/ProductList';
import convertPrice from '../components/list/convertPrice';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';

const ListPage = () => {
  const { code, pg, srt } = useParams();
  const [pgList, setPgList] = useState([]);
  const { categoryInfo, isSuccess } = new useGetCategoryInfo({
    code: code,
    pg: pg,
    srt: srt,
  });

  useEffect(() => {
    const tPgList = [];
    for (let i = 0; i < pg; i++) {
      tPgList.push(i);
    }
    setPgList(tPgList);
  }, [pg]);

  const convertedCount = useMemo(
    () => categoryInfo && convertPrice(categoryInfo.products.count),
    [categoryInfo],
  );

  const navigate = useNavigate();

  const handleNextClick = useCallback(() => {
    navigate(
      process.env.PUBLIC_URL +
        '/list/' +
        code +
        '/' +
        srt +
        '/' +
        (parseInt(pg) + 1),
    );
  }, [navigate, code, srt, pg]);

  if (isSuccess) {
    return (
      <Stack>
        <CommonHeader />
        <Container className={styles.container} fluid="lg">
          <div className={styles.banner}>S,TWIST</div>
          <div className={styles.background}>
            <Banner />
          </div>
          <hr className={styles.a} />
          <div>
            <SlHome /> HOME &gt; {categoryInfo.category.name}
          </div>
          <br />
          <br />
          <Row>
            <Col sm={6}>
              상품 <span className={styles.font}>{convertedCount}</span>개
            </Col>
            <Col sm={6}>
              <a className={styles.a} href={`/stwist/list/${code}/CP/1`}>
                {' '}
                인기순{' '}
              </a>
              <TriggerExample />|
              <a className={styles.a} href={`/stwist/list/${code}/L/1`}>
                {' '}
                낮은 가격순{' '}
              </a>
              |{' '}
              <a className={styles.a} href={`/stwist/list/${code}/A/1`}>
                {' '}
                누적 판매순{' '}
              </a>
              |{' '}
              <a className={styles.a} href={`/stwist/list/${code}/I/1`}>
                {' '}
                많은 리뷰순{' '}
              </a>
              |{' '}
              <a className={styles.a} href={`/stwist/list/${code}/G/1`}>
                {' '}
                높은 평가순{' '}
              </a>
              |{' '}
              <a className={styles.a} href={`/stwist/list/${code}/H/1`}>
                {' '}
                높은 가격순{' '}
              </a>{' '}
            </Col>
          </Row>
          <div>
            <br />
            <h3> 기본 상품</h3>

            <hr className={styles.a} />
            {pgList.map((pgNum) => (
              <ProductList key={pgNum} code={code} srt={srt} pg={pgNum} />
            ))}
            <div className={styles.buttons}>
              {' '}
              <Button
                type="button"
                className="primary"
                onClick={handleNextClick}
              >
                ㅤ˅ㅤ
              </Button>
            </div>
          </div>
        </Container>
        <CommonFooter />
      </Stack>
    );
  } else {
    return (
      <Stack>
        <CommonHeader />
        <h1> 로딩 중 ••••</h1>
        <CommonFooter />
      </Stack>
    );
  }
};

export default ListPage;
