"use client";

import "@/app/globals.css";
import productController from "@/controllers/productController";
import { useEffect, useState } from "react";
import YouMayAlsoLike from "./ymal/YouMayAlsoLike";
import LifeGrid from "./lifeGrid";
import howItsMade from "./howItsMade";
import HowItsMade from "./howItsMade";
import materialSection from "./materialSection";
import MaterialSection from "./materialSection";
import CareSection from "./careSection";
import DarkBand from "./darkBand";

interface ProductProps {
    id?: string;
}

export default function Product({ id }: ProductProps) {
    const [product, setProduct] = useState<any>(null);
    const [openAccordian, setOpenAccordian] = useState<string>('');
    const [accordianData, setAccordianData] = useState<any[]>([]);

    const fetchProduct = async () => {
        const response = await productController.getProductById(id ?? '');
        setProduct(response[0]);
        setAccordianData(response[0].attributes);
    }

    useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <>
            <section className="product-hero" id={product?.id}>
                <div className="gallery">
                    <div className="gallery-main">
                        <img src={product?.images[0].src} alt="" />
                    </div>
                    <div className="gallery-thumbs">
                        {
                            product?.images?.map((image: any) => (
                                <img key={image.id} src={image.thumbnail} alt="" />
                            ))
                        }
                    </div>
                </div>

                <div className="product-info">
                    <div className="prod-collection">Collectibles — From the Studio</div>
                    <h1 className="prod-name">{product?.name}</h1>
                    <div className="prod-subtitle">Cast concrete, hand-finished · One of a kind</div>
                    <div className="prod-price" dangerouslySetInnerHTML={{ __html: product?.price_html }}></div>
                    <div className="prod-tax">Incl. taxes · Free shipping above Rs 1,500</div>
                    <div className="availability">
                        <div className="avail-dot"></div>
                        <span className="avail-text">In stock — made to order</span>
                    </div>
                    <div className="variant-label">Finish</div>
                    <div className="variant-grid">
                        <button className="variant-btn active">Raw Concrete</button>
                        <button className="variant-btn">Matte White</button>
                        <button className="variant-btn">Charcoal</button>
                    </div>
                    <button className="add-to-cart" id="addBtn">Add to Cart</button>
                    <button className="wishlist-btn">Save to Wishlist</button>
                    <p className="short-desc" dangerouslySetInnerHTML={{ __html: product?.short_description }}></p>
                    <div className="meta-row">
                        <span className="meta-pill">Cast Concrete</span>
                        <span className="meta-pill">Handmade</span>
                        <span className="meta-pill">Made to Order</span>
                        <span className="meta-pill">Ships in 7–10 days</span>
                        <span className="meta-pill">Delhi, India</span>
                    </div>
                    <div className="accordion">
                        {accordianData.map((item: any) =>
                            <div className={`acc-item ${openAccordian === item.name ? 'open' : ''}`} key={item.name}>
                                <button className="acc-trigger" onClick={() => setOpenAccordian(item.name)}>
                                    <span className="acc-title">{item.name}</span>
                                    <div className="acc-icon"></div>
                                </button>
                                <div className={`acc-body ${openAccordian === item.name ? 'open' : ''}`}>
                                    <div className="acc-content"><ul>
                                        {item.options.map((option: any, index: number) => (
                                            <li key={index}>{option}</li>
                                        ))}
                                    </ul></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <MaterialSection />
            <HowItsMade />
            <LifeGrid />
            <CareSection />
            <DarkBand />
            <YouMayAlsoLike />
        </>)
} 