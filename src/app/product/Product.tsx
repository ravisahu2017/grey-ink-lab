"use client";

import "@/app/globals.css";
import productController from "@/controllers/productController";
import { useEffect, useState } from "react";
import YouMayAlsoLike from "./ymal/YouMayAlsoLike";

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

    const materialSection = () => {
        return (
            <section className="material-section fu vis">
                <div className="mat-visual">
                    <img src="http://localhost:8080/wp-content/uploads/2026/05/a1.jpeg" alt="" />
                </div>
                <div className="mat-copy">
                    <div className="mat-label">Material & Making</div>
                    <h2 className="mat-hl">Cast in concrete.<br /><em>Finished by hand.</em><br />Marked for life.</h2>
                    <p className="mat-body">The Humpback begins as a mould — shaped and refined over multiple pours until the form is right. Concrete is mixed by hand, poured slowly, and left to cure for 48 hours. What comes out is sanded, sealed, and pressed with the GIL mark at its base. No two pieces are identical. The irregularities in surface are not imperfections — they are the proof of how it was made.</p>
                    <div className="mat-specs">
                        <div className="spec-row">
                            <span className="spec-key">Material</span>
                            <span className="spec-val">Cast concrete, matte sealed</span>
                        </div>
                        <div className="spec-row">
                            <span className="spec-key">Dimensions</span>
                            <span className="spec-val">24 × 14 × 9 cm</span></div>
                        <div className="spec-row">
                            <span className="spec-key">Weight</span>
                            <span className="spec-val">~1.4 kg</span>
                        </div>
                        <div className="spec-row">
                            <span className="spec-key">Origin</span>
                            <span className="spec-val">Made in Delhi, India</span>
                        </div>
                        <div className="spec-row">
                            <span className="spec-key">Edition</span>
                            <span className="spec-val">Open edition, made to order</span>
                        </div>
                        <div className="spec-row">
                            <span className="spec-key">Maker</span>
                            <span className="spec-val">Mohit Vijh, Greyinklab</span>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const howItsMade = () => {
        const stepData = [
            {
                number: "01",
                title: "The Mould",
                description: "Each form begins as a handmade mould — shaped, refined, and tested across multiple pours until the proportion feels right. The Humpback mould took eleven iterations."
            },
            {
                number: "02",
                title: "The Pour",
                description: "Concrete is mixed by hand to a specific consistency and poured slowly. Trapped air is worked out manually. Each pour takes around 20 minutes per piece."
            },
            {
                number: "03",
                title: "The Cure",
                description: "Each piece cures for a minimum of 48 hours before demoulding. Rushed curing causes cracking. The weight you feel when you hold it comes from this full cure."
            },
            {
                number: "04",
                title: "The Finish",
                description: "Surface is hand-sanded progressively. The GIL mark is pressed into the base. A matte sealer is applied. The piece is photographed and inspected before packing."
            }
        ];

        return (
            <section className="process-section fu">
                <div className="process-header">
                    <h2 className="process-hl">How it's<br /><em>made.</em></h2>
                    <div className="process-sub">Four steps.<br />48 hours minimum.<br />One person.</div>
                </div>
                <div className="process-steps">
                    {stepData.map((step: any, index: number) => (
                        <div className="step" key={index}>
                            <div className="step-num">{step.number}</div>
                            <div className="step-title">{step.title}</div>
                            <p className="step-desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        )
    }


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

            {materialSection()}
            {howItsMade()}
            <YouMayAlsoLike />
        </>)
} 