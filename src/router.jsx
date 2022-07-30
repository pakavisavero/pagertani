import Homepage from './pages/Homepage/Homepage'
import Product from './pages/Product/Product'
import Cart from './pages/Cart/Cart'
import ProductDetail from './pages/Product/ProductDetail/ProductDetail'
import Quota from './pages/Quota/Quota'
import QuotaDetail from './pages/Quota/QuotaDetail/QuotaDetail';
import { Routes } from "react-router";
import { Route } from "react-router-dom";
import ProductTest from './pages/Product/ProductTest'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} exact />
      <Route path="/product" element={<Product />} exact/>
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/product-test" element={<ProductTest />} />
      
      <Route path="/quota/:id" element={<QuotaDetail />}  exact/>
      <Route path="/quota" element={<Quota />} exact/>
      
      <Route path="/cart" element={<Cart />}/>
    </Routes>
  )
}

export default Routing;