import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useProductsStore } from "../store/useProductsStore";

const ProductList: React.FC = () => {
    const navigate = useNavigate();
    const products = useProductsStore((state) => state.products);
    const toggleLike = useProductsStore((state) => state.toggleLike);
    const deleteProduct = useProductsStore((state) => state.deleteProduct);

    const [showLikedOnly, setShowLikedOnly] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 4;


    const filteredProducts = products.filter(product => {
        const isLiked = showLikedOnly ? product.liked : true;
        const isInCategory = selectedCategory === 'all' ? true : product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());

        return isLiked && isInCategory && matchesSearch;
    });

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="container text-center my-5">
            <h1 className="mb-4">Список продуктов</h1>
            <button className="btn btn-primary m-4" onClick={() => navigate('/create-product')}>
                Создать продукт
            </button>
            <button
                className="btn btn-secondary m-4"
                onClick={() => setShowLikedOnly(prev => !prev)}
            >
                {showLikedOnly ? 'Показать все продукты' : 'Показать только любимые'}
            </button>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
                className="form-select mb-4"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="all">Все категории</option>
                <option value="electronics">Электроника</option>
                <option value="jewelery">Ювелирные изделия</option>
                <option value="men's clothing">Мужская одежда</option>
                <option value="women's clothing">Женская одежда</option>
            </select>

            <div className="row">
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        toggleLike={toggleLike}
                        deleteProduct={deleteProduct}
                    />
                ))}
            </div>

            <div className="d-flex justify-content-center my-4">
                <button
                    className="btn btn-light"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Предыдущая
                </button>
                <span className="mx-3">{`Страница ${currentPage} из ${totalPages}`}</span>
                <button
                    className="btn btn-light"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Следующая
                </button>
            </div>
        </div>
    );
};

export default ProductList;