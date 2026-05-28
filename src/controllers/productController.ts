import { Product } from "@/models/product";
import { woocommerceApi } from "@/utils/api";

const mapProductData = (p: any) => {
    let colors: string[] = [];
    if (p.attributes && p.attributes.length > 0) {
        const attr = p.attributes.find((a: any) => a.name.toLowerCase() === 'color');
        if (attr && attr.options && attr.options.length > 0) {
            colors = attr.options;
        }
    }
    const attr = p.attributes.filter((a: any) => (a.name.toLowerCase() !== 'color') && (a.name.toLowerCase() !== 'size'));
    const title_subscript = p.meta_data.find((m: any) => m.key === 'title_subscript')?.value || '';


    return {
        id: p.id,
        name: p.name,
        price: p.price,
        images: p.images,
        description: p.description,
        short_description: p.short_description,
        regular_price: p.regular_price,
        sale_price: p.sale_price,
        sku: p.sku,
        attributes: attr,
        slug: p.slug,
        meta_data: p.meta_data,
        colors: colors,
        variations: p.variations || [],
        title_subscript: title_subscript,
        isBestSeller: p.meta_data.find((m: any) => m.key === 'best_seller')?.value || false,
    }
}

const mergeProductAndVariation = (product: Product, variation: any) => {
    let imgs = [...product.images]
    if (variation.image) {
        imgs.unshift(variation.image)
    }
    return {
        id: product.id,
        name: product.name,
        variationId: variation.id,
        images: imgs,
        description: product.description,
        short_description: product.short_description,
        regular_price: variation.regular_price,
        sale_price: variation.sale_price,
        sku: product.sku,
        attributes: product.attributes,
        slug: product.slug,
        meta_data: product.meta_data,
        colors: product.colors,
        variations: product.variations || [],
    }
}

export default class ProductController {
    static async getCategories(): Promise<any[]> {
        try {
            const response = await woocommerceApi.get('/products/categories');
            return response.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

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
    static async getProductVariationsById(product: Product, variationId: number): Promise<any> {
        try {
            const response = await woocommerceApi.get(`/products/${product.id}/variations/${variationId}`);
            return mergeProductAndVariation(product, response.data);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}