import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/stwist/" element={<Home />} />
      <Route path="/list/:code" element={'List'} />
      <Route path="/detail/:code" element={'detailCode'} />
    </Routes>
  );
}

export default App;
