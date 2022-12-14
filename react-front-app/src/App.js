import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import Detail from './pages/DetailPage';
import Closet from './pages/Closet';

function App() {
  return (
    <Routes>
      <Route path="/stwist/">
        <Route path="" element={<HomePage />} />
        <Route path="list/:code/:isTop/:srt/:pg" element={<ListPage />} />
        <Route path="detail/:code/:isTop" element={<Detail />} />
        <Route path="closet" element={<Closet/>}/>
      </Route>
    </Routes>
  );
}

export default App; 
