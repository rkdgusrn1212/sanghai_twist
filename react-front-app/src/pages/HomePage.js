import CommonHeader from '../components/common/CommonHeader';
import Banner from '../components/home/Banner';
import CategoryGrid from '../components/home/CategoryGrid';
import CategoryFixed from '../components/home/CategoryFixed';
import CategoryTree from '../components/home/CategoryTree';
import { useGetCategoryList } from '../hooks';

const Home = () => {
  const { categoryList, isSuccess } = useGetCategoryList();
  return (
    <>
      <CommonHeader />
      <Banner />
      <CategoryTree
        data={isSuccess && categoryList}
        onClickItem={({ key, name, ...props }) => {
          this.navigate(props.url);
        }}
        debounceTime={125}
      />
      <CategoryGrid />
      <CategoryFixed />
    </>
  );
};

export default Home;
