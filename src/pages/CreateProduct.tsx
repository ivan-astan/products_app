import React, { useState } from 'react';
import { useProductsStore } from '../store/useProductsStore';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const addProduct = useProductsStore((state) => state.addProduct);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = {
            id: Date.now(),
            name,
            image,
            liked: false,
            description,
        };
        addProduct(newProduct);
        navigate('/products');
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Создать продукт</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Название продукта</label>
                    <input
                        type="text"
                        id="productName"
                        className="form-control"
                        placeholder="Введите название продукта"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                        Пожалуйста, введите название продукта.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Ссылка на изображение</label>
                    <input
                        type="text"
                        id="productImage"
                        className="form-control"
                        placeholder="Введите ссылку на изображение"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                        Пожалуйста, введите ссылку на изображение.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">Описание</label>
                    <textarea
                        id="productDescription"
                        className="form-control"
                        placeholder="Введите описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                        Пожалуйста, введите описание продукта.
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Создать продукт</button>
            </form>
        </div>
    );
};

export default CreateProduct;