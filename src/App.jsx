import logo from './logo.svg';
import Product from './Product/Product';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Routes } from "react-router";
import { Fragment } from 'react';
import Homepage from './Homepage/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Link to='/'>Homepage</Link>
      <Link to='/product'>Product</Link>
      
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/product" element={<Product />}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App;
