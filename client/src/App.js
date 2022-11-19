import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Category from './pages/Category';
import PDP from './pages/PDP';
import Cart from './pages/Cart';

function App() {

  return(
    
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/'>
          <Route index element={<Category />} />
          <Route path='pdp' element={<PDP />} />
          <Route path='cart' element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
