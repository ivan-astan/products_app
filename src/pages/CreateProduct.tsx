import React from 'react';
import { useProductsStore } from '../store/useProductsStore';
import {Link, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {Product} from "../api/productAPI";

interface CreateProductForm {
    title: string;
    image: string;
    description: string;
    category: string;
    price: string;
}

const CreateProduct: React.FC = () => {
    const addProduct = useProductsStore((state) => state.addProduct);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateProductForm>();

    const onSubmit = (data: CreateProductForm) => {
        const newProduct: Product = {
            id: Date.now(),
            price: parseInt(data.price),
            title: data.title,
            image: data.image,
            liked: false,
            description: data.description,
            category: data.category,
        };
        addProduct(newProduct);
        navigate('/products');
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Создать продукт</h2>
            <Link to="/products" className="btn btn-primary btn-lg mb-3">Назад</Link>
            <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Название продукта</label>
                    <input
                        type="text"
                        id="productName"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        placeholder="Введите название продукта"
                        {...register('title', {required: 'Пожалуйста, введите название продукта.'})}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Цена</label>
                    <input
                        type="number"
                        id="productPrice"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        placeholder="Введите цену"
                        {...register('price', {required: 'Пожалуйста, введите цену.'})}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Ссылка на изображение</label>
                    <input
                        type="text"
                        id="productImage"
                        className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                        placeholder="Введите ссылку на изображение"
                        {...register('image', {required: 'Пожалуйста, введите ссылку на изображение.'})}
                    />
                    {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">Описание</label>
                    <textarea
                        id="productDescription"
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        placeholder="Введите описание"
                        {...register('description', {required: 'Пожалуйста, введите описание продукта.'})}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="productCategory" className="form-label">Категория</label>
                    <select
                        id="productCategory"
                        className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                        {...register('category', {required: 'Пожалуйста, выберите категорию.'})}
                    >
                        <option value="">Выберите категорию</option>
                        <option value="electronics">Электронные товары</option>
                        <option value="jewelery">Ювелирные изделия</option>
                        <option value="men's clothing">Мужская одежда</option>
                        <option value="women's clothing">Женская одежда</option>
                    </select>
                    {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Создать продукт</button>
            </form>
        </div>
    );
};

export default CreateProduct;