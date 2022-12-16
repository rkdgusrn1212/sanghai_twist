import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMemo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CommonHeader = ({ active }) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const pages = useMemo(() => {
    const result = {
      '': {
        name: 'Home',
        active: false,
      },
      '/closet': {
        name: 'My Closet',
        active: false,
      },
      '/detail': {
        name: 'detail',
        active: false,
      },
    };
    active && (result[active].active = true);
    return result;
  }, [active]);

  const handleChange = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      navigate(process.env.PUBLIC_URL + '?kwd=' + keyword);
      e.preventDefault();
    },
    [keyword, navigate],
  );

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          href={process.env.PUBLIC_URL}
          style={{ fontFamily: 'cafe-classic' }}
        >
          S.TWIST
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="me-auto">
            {Object.entries(pages).map(([key, value]) => (
              <Nav.Link
                href={process.env.PUBLIC_URL + key}
                key={key}
                active={value.active}
                style={{ fontFamily: 'cafe-surround' }}
              >
                {value.name}
              </Nav.Link>
            ))}
          </Nav>
          <Form
            className="d-flex"
            style={{
              fontFamily: 'cafe-simplehae',
            }}
            onSubmit={handleSubmit}
          >
            <Form.Control
              type="search"
              placeholder="카테고리 검색"
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="outline-buttonPrimary"
              style={{
                color: 'white',
                whiteSpace: 'nowrap',
              }}
            >
              검색
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CommonHeader;
