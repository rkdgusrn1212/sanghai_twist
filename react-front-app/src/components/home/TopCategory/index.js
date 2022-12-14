import styled from 'styled-components';
import topIcon from './top_icon.png';
import topIconHover from './top_icon_hover.png';

const TopImage = styled.img`
  &:hover {
    content: url(${topIconHover});
  }
  position: absolute;
  content: url(${topIcon});
  width: 100px;
  height: 100px;
`;

const TopCategory = (props) => (
  <a href="./#">
    <TopImage {...props} />
  </a>
);
export default TopCategory;
