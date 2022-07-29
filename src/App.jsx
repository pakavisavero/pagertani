import logo from './logo.svg';
import Product from './Product/Product';
import Quota from './Quota/Quota';
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import { Routes } from "react-router";
import { Fragment } from 'react';
import Homepage from './Homepage/Homepage';
import ProductDetail from './Product/ProductDetail/ProductDetail';
import './App.css';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">Pagertani</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <NavLink className="text-link" to='/'>
                <li className="nav-link">
                  Homepage
                </li>
              </NavLink>
              <NavLink className="text-link" to='/product'>
                <li className="nav-link">
                  Products
                </li>
              </NavLink>
              <NavLink className="text-link" to='/quota'>
                 <li className="nav-link">
                  Quotas
                </li>
              </NavLink>
            </ul>
          </div>
        </nav>
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
