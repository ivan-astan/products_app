import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, Navigate, HashRouter} from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import ProductDetailed from './pages/ProductDetailed';
import CreateProduct from './pages/CreateProduct';
import {useProductsStore} from './store/useProductsStore'
import UpdateProduct from "./pages/UpdateProduct";

function App() {
    const getProducts = useProductsStore((state) => state.getProducts);
    useEffect(() => {
        getProducts()
    })
  return (
      <HashRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetailed />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/products/edit/:id" element={<UpdateProduct />} />
        </Routes>
      </HashRouter>
  );
}

export default App;