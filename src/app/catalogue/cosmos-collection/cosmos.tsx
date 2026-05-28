"use client";

import "@/app/globals.css";
import { useEffect, useState } from "react";
import { Product } from "@/models/product";
import productController from "@/controllers/productController";
import { useRouter } from "next/navigation";
import { useCategory } from "@/context/CategoryContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AlsoExplore from "../alsoExplore";
import CategoryBanner from "../categoryBanner";

export default function CosmosCollection() {
    const { getCategoryIdBySlug } = useCategory();
    const categoryId = getCategoryIdBySlug("cosmos-collection") || 23;
    const [products, setProducts] = useState<Product[]>([]);
    useScrollAnimation(products);
    const router = useRouter();
    const fetchRelatedProducts = async () => {
        const response = await productController.getProducts({ category: categoryId });
        setProducts(response);
    }

    useEffect(() => {
        if (categoryId) {
            fetchRelatedProducts();
        }
    }, [categoryId]);

    return (
        <>
            <div className="cat-header fu">
                <div>
                    <div className="cat-eyebrow">Collectibles — From the Studio</div>
                    <h1 className="cat-h1">Cosmos Collection<br /><em>Sculptures</em></h1>
                </div>
                <div>
                    <p className="cat-desc">Everyday things made worth noticing. Each tissue holder is cast in concrete and finished by hand — designed to hold quiet presence on your desk, your bedside, wherever it lives with you. No two are identical.</p>
                    <div className="cat-count">12 pieces · Made to order · Ships in 7–10 days</div>
                </div>
            </div>

            <div className="filter-bar">
                <div className="filter-pills">
                    <button className="fp active">All</button>
                    <button className="fp">Raw Concrete</button>
                    <button className="fp">Glazed</button>
                    <button className="fp">Painted</button>
                    <button className="fp">Under Rs 10,000</button>
                    <button className="fp">New In</button>
                </div>
                <div className="sort-wrap">
                    <span className="sort-label">Sort</span>
                    <select className="sort-select">
                        <option>Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>

            <div className="cat-grid">
                {products.map((product: Product) => (
                    <div className="pc fu" key={product.id}>
                        <div className="pc-img">
                            <img src={product.images[0].src} alt={product.name} />
                            <div className="pc-ov"><div className="pc-ov-btn" onClick={() => { router.push(`/product?id=${product.sku}`) }}>Quick View</div></div>
                            {product.isBestSeller && <div className="pc-tag">Bestseller</div>}
                        </div>
                        <div className="pc-name">{product.name}</div>
                        <div className="pc-sub">{product.title_subscript}</div>
                        <div className="pc-bottom"><span className="pc-price">Rs {product.price}</span><span className="pc-craft">Made to order</span></div>
                    </div>
                ))}
            </div>
            <CategoryBanner />
            <AlsoExplore currentCategory={categoryId} />
        </>
    )
}