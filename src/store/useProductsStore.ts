import { create } from 'zustand';
import {Product, productsAPI} from "../api/productAPI";



interface Store {
    products: Product[];
    addProduct: (product: Product) => void;
    toggleLike: (id: number) => void;
    deleteProduct: (id: number) => void;
    getProducts: () => void;
}

export const useProductsStore = create<Store>(
        (set) => ({
            products: [],
            getProducts: async() => {

                    try {
                        const products = await productsAPI.getProducts();
                        set((state) => ({products: products}))
                    } catch (error) {
                        console.error('Error fetching products:', error);
                    }

            },
            addProduct: (product) => {
                set((state) => ({
                    products: [...state.products, product]
                }));
            },
            toggleLike: (id) => set((state) => ({
                products: state.products.map((product) =>
                    product.id === id ? { ...product, liked: !product.liked } : product
                ),
            })),
            deleteProduct: (id) => set((state) => ({
                products: state.products.filter((product) => product.id !== id),
            })),
        }),

);