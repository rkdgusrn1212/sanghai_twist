import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import gitIcon from './GitHub-Mark-32px.png';

const FooterContainer = styled.div`
  background: linear-gradient(#ffffff, rgb(163, 215, 255));
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
`;

const FooterLink = styled.a`
  font-family: cafe-surround;
  color: black;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 20px;
  text-decoration: none;
`;

const CommonFooter = () => {
  return (
    <FooterContainer>
      <Container fluid="md">
        <Stack>
          <div className="d-flex">
            <FooterLink
              href="https://github.com/rkdgusrn1212/sanghai_twist"
              className="ml-3"
            >
              <span>
                <img
                  src={gitIcon}
                  alt="GitHub Icon"
                  width="32px"
                  height="32px"
                />
              </span>
              &nbsp;&nbsp;GitHub
            </FooterLink>
          </div>
        </Stack>
      </Container>
    </FooterContainer>
  );
};
export default CommonFooter;
