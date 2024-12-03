import { create } from 'zustand';
import {Product, productsAPI} from "../api/productAPI";



interface Store {
    products: Product[];
    addProduct: (product: Product) => void;
    toggleLike: (id: number) => void;
    deleteProduct: (id: number) => void;
    getProducts: () => void;
    updateProduct: (product: Product) => void;
}

export const useProductsStore = create<Store>(
        (set) => ({
            products: [],
            getProducts: async() => {

                    try {
                        const products = await productsAPI.getProducts();
                        set(() => ({products: products}))
                    } catch (error) {
                        console.error('Error fetching products:', error);
                    }

            },
            addProduct: async(product) => {
                try {
                    await productsAPI.addProduct(product);
                    set((state) => ({products: [product, ...state.products]}))
                } catch (error) {
                    console.error('Error fetching products:', error);
                }

            },
            toggleLike: (id) => set((state) => ({
                products: state.products.map((product) =>
                    product.id === id ? { ...product, liked: !product.liked } : product
                ),
            })),
            deleteProduct: (id) => {
                productsAPI.deleteProduct(id)
                set((state) => ({
                    products: state.products.filter((product) => product.id !== id),
                }))
            },
            updateProduct: async (product: Product) => {
                try {
                    await productsAPI.updateProduct(product);
                    console.log(product);
                    set((state) => ({
                        products: state.products.map((p) => {
                            if (p.id === product.id) {
                                console.log('found product:', p);
                                return {
                                    ...product
                                };
                            }
                            return p;
                        }),
                    }));
                } catch (error) {
                    console.error("Ошибка обновления продукта:", error);
                }
            }

        }),

);