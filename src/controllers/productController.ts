import { Product } from "@/models/product";
import { woocommerceApi } from "@/utils/api";

const mapProductData = (p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    images: p.images,
    description: p.description,
    short_description: p.short_description,
    price_html: p.price_html,
    regular_price: p.regular_price,
    sale_price: p.sale_price,
    sku: p.sku,
    attributes: p.attributes,
    slug: p.slug,
    meta_data: p.meta_data
})

export default class ProductController {

    static async getProducts({ category, slug }: { category?: number, slug?: string }): Promise<Product[]> {
        try {
            let url = '/products';
            let params = ''
            if (category) {
                params += `category=${encodeURIComponent(category)}&`;
            }
            if (slug) {
                params += `slug=${encodeURIComponent(slug)}&`;
            }

            if (params.length > 0) {
                params = params.slice(0, -1);
                url += `?${params}`;
            }

            const response = await woocommerceApi.get(url);
            let list: Product[] = [];
            if (response.data.length > 0) {
                list = response.data.map((p: any) => mapProductData(p));
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
                list = response.data.map((p: any) => mapProductData(p));
            }
            return list;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


    static getTitleSubscript(p: Product): string {
        if (!p || !p.meta_data || p.meta_data.length === 0) {
            return '';
        }
        return p.meta_data.find((m: any) => m.key === 'title_subscript')?.value || '';
    }

    static isBestSeller(p: Product): boolean {
        if (!p || !p.meta_data || p.meta_data.length === 0) {
            return false;
        }
        return p.meta_data.find((m: any) => m.key === 'best_seller')?.value || false;
    }
}