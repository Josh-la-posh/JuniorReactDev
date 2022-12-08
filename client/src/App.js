import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Header from './components/Header';
import Category from './pages/Category';
import PDP from './pages/PDP';
import Cart from './pages/Cart';
import { QUERY_ALL_CATEGORIES, QUERY_CURRENCIES } from './FetchData/DisplayData';
import { Suspense } from 'react';

function App() {
  
  const {data, loading, error} = useQuery(QUERY_ALL_CATEGORIES);
  
  const PdpId = () => {
    let id = useParams();
    if (loading) {
      <h1>loading...</h1>
    }
    if(error) {
      <h1>An error occured</h1>
    }
    // let id = useParams();
    if (data) {
      console.log(id.id)

      const product = data.categories[0].products.filter(product => product.id === id.id);
      return <PDP product={product[0]}  />;
    }

  }

  const CategoryId = () => {
    let id = useParams();
    if (loading) {
      <h1>loading...</h1>
    }
    if(error) {
      <h1>An error occured</h1>
    }
    // let id = useParams();
    if (data) {
      console.log(id.id)

      const product = data.categories[0].products.filter(product => product.id === id.id);
      console.log(id.id)
      return <PDP product={product[0]}  />;
    }

  }

  return(
    
    <BrowserRouter>
      <Suspense fallback={<Header />}>
        <Header/>
        <Routes>
          <Route path='/Scandiweb/'>
            <Route index element={<Category data={data}/>} />
            <Route path='category/:category' element={<Category data={data} />} />
            <Route path='pdp/:id' element={<PdpId />} />
            <Route path='cart' element={<Cart/>} />
          </Route>
          <Route path='*' element={<Navigate to='/Scandiweb/' replace={true} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App;
