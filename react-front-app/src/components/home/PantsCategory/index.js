import styled from 'styled-components';
import pantsIcon from './pants_icon.png';
import pantsIconHover from './pants_icon_hover.png';

const PantsImage = styled.img`
  &:hover {
    content: url(${pantsIconHover});
  }
  content: url(${pantsIcon});
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
`;
const PantsCategory = () => (
  <a href="./#">
    <PantsImage />
  </a>
);
export default PantsCategory;
