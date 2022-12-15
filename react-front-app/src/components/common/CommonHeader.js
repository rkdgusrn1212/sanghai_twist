import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useMemo } from 'react';

const CommonHeader = ({ active }) => {
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
    };
    result[active].active = true;
    return result;
  }, [active]);

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      style={{ fontFamily: 'cafe-surround' }}
    >
      <Container>
        <Navbar.Brand href="#home" style={{ fontFamily: 'cafe-classic' }}>
          S.TWIST
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {Object.entries(pages).map(([key, value]) => (
              <Nav.Link href={'/stwist' + key} key={key} active={value.active}>
                {value.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CommonHeader;
