import styled from 'styled-components';
import topIcon from './top_icon.png'

const TopImage = styled.img`
  content:url(${topIcon});
  width: 100px;
  height: 100px;
  margin-top : 30px;
`;
const TopCategory = ()=>(
  <a href="./#">
    <TopImage/>
  </a>
)
export default TopCategory;
