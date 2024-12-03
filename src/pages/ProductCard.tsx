import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from "../api/productAPI";
import classes from './Product.module.css';

interface ProductCardProps {
    product: Product;
    toggleLike: (id: number) => void;
    deleteProduct: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, toggleLike, deleteProduct }) => {
    const navigate = useNavigate();

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 mb-5">
            <div className="card h-100 shadow-sm p-3 d-flex flex-column">
                <img
                    src={product.image}
                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                    alt={product.title}
                    className="mx-auto img-fluid"
                />
                <div className="card-body d-flex flex-column flex-grow-1">
                    <h6 className="card-title">{product.title}</h6>
                    <p className={classes.cardText}>
                        {product.description}...
                    </p>
                    <p className="card-text">
                        <strong>Цена: </strong>${product.price}
                    </p>
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
                <div className="card-footer text-center" onClick={() => navigate(`/products/${product.id}`)}>
                    <Link to={`/products/${product.id}`} className="btn btn-success">
                        Подробнее
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;