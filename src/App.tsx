import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import Product from './pages/Product';
import CreateProduct from './pages/CreateProduct';
import {useProductsStore} from './store/useProductsStore'

function App() {
    const getProducts = useProductsStore((state) => state.getProducts);
    useEffect(() => {
        getProducts()
    })
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;