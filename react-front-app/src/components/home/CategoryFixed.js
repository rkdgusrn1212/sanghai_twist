import TopCategory from './TopCategory';
import PantsCategory from './PantsCategory';

const CategoryFixed = (categoryList) => (
  <div
    className="card fixed-top"
    style={{ width: 140, height: 220, position: 'absolute', top: '20%' }}
  >
    <PantsCategory style={{  left: '10px', top: '90px' }} category={categoryList.pants} />
    <TopCategory style={{ left: '20px', top: '10px' }} category={categoryList.top} />
  </div>
);
export default CategoryFixed;