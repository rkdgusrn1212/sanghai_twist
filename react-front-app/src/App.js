import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

function App() {
  const [code, setCode] = useState([]);

  return (
    <Routes>
      <Route path="/stwist/" element={<HomePage />} />
      <Route path="/list/:code" element={'List'} />
      <Route path="/detail/:code" element={<DetailPage code={code} />} />
    </Routes>
  );
}

export default App;
