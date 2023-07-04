import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./component/ProductsPage";
import Home from "./component/Home";
import ProductDetails from "./component/ProductDetails";
import Navbar from "./component/Navbar";
import './App.css';
import Cart from "./component/Cart";
import CreateOrderPage from "./component/Orders";

export default function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (productDetails) => {
    setCart([...cart, productDetails]);
  };
  return (
    <div className="app">
       <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/product-details/:productId" element={<ProductDetails addToCart={handleAddToCart} />} />
        <Route path="/place-order" element={<CreateOrderPage />} />
      </Routes>
    </BrowserRouter>
    </div>
   
  );
}
