import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductsStore } from '../store/useProductsStore';

const Product = () => {
    const { id } = useParams();
    const product = useProductsStore((state) => state.products.find((p) => p.id === Number(id)));

    if (!product) return <h1 className="text-danger text-center">Продукт не найден</h1>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card text-center">
                        <img src={product.image} alt={product.name} className="card-img-top" />
                        <div className="card-body">
                            <h1 className="card-title">{product.name}</h1>
                            <p className="card-text">{product.description}</p>
                            <Link to="/products" className="btn btn-primary">Назад</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;