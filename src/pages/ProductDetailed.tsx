import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductsStore } from '../store/useProductsStore';

const ProductDetailed = () => {
    const { id } = useParams();
    const product = useProductsStore((state) => state.products.find((p) => p.id === Number(id)));

    if (!product) return <h1 className="text-danger text-center">Продукт не найден</h1>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card text-center align-items-center shadow-lg p-5" style={{ borderRadius: '15px' }}>
                        <img
                            src={product.image}
                            style={{ maxHeight: '200px', maxWidth: '150px' }}
                            alt={product.title}
                            className="card-img-top img-fluid"
                        />
                        <div className="card-body">
                            <h1 className="card-title">{product.title}</h1>
                            <p className="card-text">{product.description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <Link to="/products" className="btn btn-primary btn-lg m-3">Назад</Link>
                                <Link to={`/products/edit/${product.id}`} className="btn btn-secondary btn-lg m-3">Изменить</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailed;