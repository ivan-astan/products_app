import React from 'react';
import { useProductsStore } from '../store/useProductsStore';
import {Link, useNavigate} from 'react-router-dom';

const ProductsList = () => {

    const products = useProductsStore((state) => state.products);
    const toggleLike = useProductsStore((state) => state.toggleLike);
    const deleteProduct = useProductsStore((state) => state.deleteProduct);
    const navigate = useNavigate();
    return (
        <div className="container text-center my-5">
            <h1 className="mb-4">Список продуктов</h1>
            <button className="btn btn-primary mb-4" onClick={() => navigate('/create-product')}>Создать продукт</button>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-sm-12 col-md-6 col-lg-3 mb-5">
                        <div className="card h-100 shadow-sm p-3" onDoubleClick={() => navigate(`/products/${product.id}`)}>
                            <img src={product.image} style={{maxWidth: '250px', maxHeight: '250px'}} alt={product.title}
                                 className="mx-auto img-fluid"/>
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title">{product.title}</h2>
                                <p className="card-text">{product.description}...</p>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <button
                                        onClick={() => toggleLike(product.id)
                                        }
                                        className="btn btn-outline-primary"
                                    >
                                        {product.liked ? '❤️' : '🤍'}
                                    </button>
                                    <button
                                        onClick={() =>

                                            deleteProduct(product.id)
                                        }
                                        className="btn btn-danger"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                            <div className="card-footer text-center"
                                 onClick={() => navigate(`/products/${product.id}`)}>
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