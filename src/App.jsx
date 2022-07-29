import logo from './logo.svg';
import Product from './Product/Product';
import Quota from './Quota/Quota';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Routes } from "react-router";
import { Fragment } from 'react';
import Homepage from './Homepage/Homepage';
import ProductDetail from './Product/ProductDetail/ProductDetail';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Link to='/'>Homepage | </Link>
        <Link to='/product'>Product | </Link>
        <Link to='/quota'>Quotas | </Link>

        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/product" element={<Product />} exact/>
          <Route path="/product/:id" element={<ProductDetail/> } exact/>
          <Route path="/quota" element={<Quota />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
