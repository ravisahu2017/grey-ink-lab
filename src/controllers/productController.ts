import { woocommerceApi } from "@/utils/api";

export default class ProductController {
    static async getProducts() {
        try {
            const response = await woocommerceApi.get(`/products`);
            let list: Product[] = [];
            if (response.data.length > 0) {
                list = response.data.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    images: p.images,
                    description: p.description,
                    short_description: p.short_description,
                    price_html: p.price_html,
                    sku: p.sku,
                    attributes: p.attributes
                }));
            }
            return list;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    static async getProductById(id: string): Promise<Product[]> {
        try {
            const response = await woocommerceApi.get(`/products?sku=${id}`);
            let list: Product[] = [];
            if (response.data.length > 0) {
                list = response.data.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    images: p.images,
                    description: p.description,
                    short_description: p.short_description,
                    price_html: p.price_html,
                    sku: p.sku,
                    attributes: p.attributes
                }));
            }
            return list;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}