import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import Closet from './pages/Closet';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Routes>
      <Route path="/stwist/">
        <Route path="" element={<HomePage />} />
        <Route path="list/:code/:srt/:pg" element={<ListPage />} />
        <Route path="detail/:code" element={<DetailPage />} />
        <Route path="closet" element={<Closet />} />
      </Route>
    </Routes>
  );
}

export default App;
