import { useParams } from 'react-router-dom';

const ListPage = () => {
  const { code, pg, srt } = useParams();
  return (
    <>
      <p>{code}</p>
      <p>{pg}</p>
      <p>{srt}</p>
    </>
  );
};
export default ListPage;
