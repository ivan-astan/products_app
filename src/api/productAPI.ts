
export interface Product {
    id: number;
    title: string;
    image: string;
    category:string;
    liked: boolean;
    description: string;
    price: number;
}
export const productsAPI = {
    getProducts: async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products')

            return (await response.json()) as Product[] ;
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error
            );
            throw error;
        }
    },
    addProduct: async(product: Product) => {

        try {
            const response = await fetch('https://fakestoreapi.com/products',{
                method:"POST",
                body:JSON.stringify(
                    {
                        title: product.title,
                        price: product.price,
                        description: product.description,
                        image: product.image,
                        category: product.category
                    }
                )
            })

            return (await response.json()) as Product;
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error
            );
            throw error;
        }
    },
    deleteProduct: async(id: number) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
                method:"DELETE"
            })
            return await response.json();
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error
            );
            throw error;
        }
    },
    updateProduct: async(product: Product) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${product.id}`,{
                method:"PUT",
                body:JSON.stringify(
                    {
                        title: 'test product',
                        price: 13.5,
                        description: 'lorem ipsum set',
                        image: 'https://i.pravatar.cc',
                        category: 'electronic'
                    }
                )
            })
            return (await response.json()) as Product[] ;
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error
            );
            throw error;
        }
    }

};