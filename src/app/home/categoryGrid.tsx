"use client"

import productController from "@/controllers/productController";
import { Product } from "@/models/product";
import { useEffect, useState } from "react";
import '@/app/globals.css'
import './categoryGrid.css'


export default function CategoryGrid({ category }: { category: any }) {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (!category) return;
        productController.getProducts({
            category: category.id
        }).then((data: Product[]) => {
            setProducts(data);
        });
    }, [category]);

    const goToCatalogue = (slug: string) => {
        window.location.href = `/catalogue/${slug}`;
    }

    const goToProduct = (slug: string) => {
        window.location.href = `/product?slug=${slug}`;
    }

    return (
        <section className="home-category-grid fu">
            <div className="section-header">
                <div className="section-header-left">
                    <h2 className="sec-title">{category?.name}</h2>
                    <span className="sec-subtitle">From the studio</span>
                </div>
                <a href="#" className="sec-viewall" onClick={() => goToCatalogue(category?.slug)}>View all</a>
            </div>
            <div className="product-grid">
                {products.map((product: Product, index: number) => (
                    <div className={`product-card fade-up fade-up-d${(index % 4) + 1}`} key={product.id} onClick={() => goToProduct(product.slug)}>
                        <div className="product-card-img">
                            <img src={product.images[0].src} alt={product.name} />
                            <div className="product-card-overlay"><span>Quick view</span></div>
                        </div>
                        <div className="product-card-name">{product.name}</div>
                        <div className="product-card-meta"><span className="product-card-price">Rs {product.price}</span><span className="product-card-craft">Cast concrete</span></div>
                    </div>
                ))}
            </div>
        </section>
    )
}