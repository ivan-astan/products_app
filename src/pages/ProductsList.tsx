import React from 'react';
import { useProductsStore } from '../store/useProductsStore';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const products = useProductsStore((state) => state.products);
    const toggleLike = useProductsStore((state) => state.toggleLike);
    const deleteProduct = useProductsStore((state) => state.deleteProduct);

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Список продуктов</h1>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img src={product.image} alt={product.name} className="card-img-top" />
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title">{product.name}</h2>
                                <p className="card-text">{product.description.slice(0, 100)}...</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <button
                                        onClick={() => toggleLike(product.id)}
                                        className="btn btn-outline-primary"
                                    >
                                        {product.liked ? '❤️' : '🤍'}
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="btn btn-danger"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <Link to={`/products/${product.id}`} className="btn btn-success">
                                    Подробнее
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;