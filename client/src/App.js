import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Header from './components/Header';
import Category from './pages/Category';
import PDP from './pages/PDP';
import Cart from './pages/Cart';
import { QUERY_ALL_CATEGORIES } from './FetchData/DisplayData';

function App() {

  const {data, loading, error} = useQuery(QUERY_ALL_CATEGORIES);
  
  const PdpId = () => {
    if (loading) {
      <h1>loading...</h1>
    }
    if(error) {
      <h1>An error occured</h1>
    }
    let id = useParams();
    if (data) {
      const product = data.categories[0].products.filter(product => product.id === id.id);
  
      return <PDP product={product[0]}  />;
    }

  }

  return(
    
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/'>
          <Route index element={<Category data={data}/>} />
          <Route path='pdp/:id' element={<PdpId />} />
          <Route path='cart' element={<Cart data={data}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
