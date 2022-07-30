import ProductDetail from './pages/Product/ProductDetail/ProductDetail';
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom";
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Routing from './router';
import { CartValue } from './state/CartState';
import './App.css';

function App() {
  const [cart, setCart] = useState(1);
  return (
    <BrowserRouter>
      <CartValue.Provider value={{cart, setCart}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
          <div className='container'>
            <a className="navbar-brand">Pagertani</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarText">
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
              <Link to={'/cart'}>
                <button className="btn btn-light position-relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16" className='mr-1'>
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    {cart}
                  </span>
                </button>

              </Link>
            </div>
          </div>
        </nav>
        <div className="container">
            <Routing />
        </div>
      </CartValue.Provider>
    </BrowserRouter>
  )
}

export default App;
