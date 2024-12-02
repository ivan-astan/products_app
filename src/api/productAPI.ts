
export interface Product {
    id: number;
    title: string;
    image: string;
    category:string;
    liked: boolean;
    description: string;
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
};