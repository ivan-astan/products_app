import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Product {
    id: number;
    name: string;
    image: string;
    liked: boolean;
    description: string;
}

interface Store {
    products: Product[];
    addProduct: (product: Product) => void;
    toggleLike: (id: number) => void;
    deleteProduct: (id: number) => void;
}

export const useProductsStore = create<Store>()(
    persist(
        (set) => ({
            products: [],
            addProduct: (product) => {
                set((state) => {
                    console.log("Текущие продукты:", state.products);
                    const newProducts = [...state.products, product];
                    console.log("Новые продукты:", newProducts);
                    return { products: newProducts };
                });
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
        {
            name: 'product-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);