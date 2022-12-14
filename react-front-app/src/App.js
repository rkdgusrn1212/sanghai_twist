import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';


function App() {
  const [code, setCode] = useState([]);

  return (
    <Routes>
      <Route path="/stwist/">
        <Route path="" element={<HomePage />} />
        <Route path="list/:code/:srt/:pg" element={<ListPage />} />
        <Route path="/detail/:code/:isTop" element={<DetailPage />} />
      </Route>

    </Routes>
  );
}

export default App;
