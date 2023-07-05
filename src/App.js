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
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const handleQuantityChange = (itemId, quantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: parseInt(quantity, 10) };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/cart"
            element={<Cart cart={cartItems} onUpdateQuantity={handleQuantityChange} />}
          />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails addToCart={handleAddToCart} />}
          />
          <Route path="/place-order" element={<CreateOrderPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
