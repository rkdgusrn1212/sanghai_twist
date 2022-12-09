import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/stwist/" element={<HomePage />} />
      <Route path="/list/:code" element={'List'} />
      <Route path="/detail/:code" element={'detailCode'} />
    </Routes>
  );
}

export default App; 
