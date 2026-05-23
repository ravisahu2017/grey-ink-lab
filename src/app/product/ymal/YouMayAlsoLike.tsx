"use client";

import "./ymal.css";
import { useEffect, useState } from "react";
import productController from "@/controllers/productController";

interface YouMayAlsoLikeProps {
    id?: string;
}

export default function YouMayAlsoLike({ id }: YouMayAlsoLikeProps) {
    const [products, setProducts] = useState<any>(null);

    const fetchRelatedProducts = async () => {
        const response = await productController.getProducts();
        const filterProducts = response.filter((p: any) => p.id !== id).slice(0, 4);
        setProducts(filterProducts);
    }

    useEffect(() => {
        fetchRelatedProducts();
    }, []);

    return (
        <section className="related">
            <div className="rel-header">
                <h2 className="rel-title">You may also like</h2>
                <a href="#" className="rel-va">View all collectibles</a>
            </div>
            <div className="rel-grid">
                {products && products.length > 0 && products.map((p: any, index: number) => (
                    <div key={index} className="rel-card fu fu-d1">
                        <div className="rel-img">
                            <img src={p.images[0].src} alt={p.images[0].alt} />
                        </div>
                        <div className="rel-name">{p.name}</div>
                        <div className="rel-price">Rs {p.price}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}