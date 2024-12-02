import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import Product from './pages/Product';
import CreateProduct from './pages/CreateProduct';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;