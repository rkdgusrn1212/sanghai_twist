import styled from 'styled-components';
import pantsIcon from './pants_icon.png';
import pantsIconHover from './pants_icon_hover.png';

const PantsImage = styled.img`
  &:hover {
    content: url(${pantsIconHover});
  }
  position: absolute;
  content: url(${pantsIcon});
  width: 120px;
  height: 120px;
`;
const PantsCategory = (props) => (
  <a href="./#">
    <PantsImage {...props}/>
  </a>
);
export default PantsCategory;
