import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import Category from './pages/Category';
import PDP from './pages/PDP';
import Cart from './pages/Cart';
import { useSelector } from 'react-redux';

function App() {
  const datas = useSelector(state => state.reducer.data);
  
  const PdpId = () => {
    const id = useParams();
    const data = datas.filter(data => data.id === parseInt(id.id));
    return (
      <PDP data={data[0]}/>
    )
  }

  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/'>
          <Route index element={<Category data={datas}/>} />
          <Route path='pdp/:id' element={<PdpId />} />
          <Route path='cart' element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
