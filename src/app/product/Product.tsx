"use client";

import "@/app/globals.css";
import productController from "@/controllers/productController";
import { useEffect, useState } from "react";
import YouMayAlsoLike from "./ymal/YouMayAlsoLike";
import LifeGrid from "./lifeGrid";
import HowItsMade from "./howItsMade";
import MaterialSection from "./materialSection";
import CareSection from "./careSection";
import DarkBand from "./darkBand";
import { useCart } from "@/context/CartContext";

export default function Product({ slug }: { slug?: string }) {
    const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);
    const [openAccordian, setOpenAccordian] = useState<string>('');
    const [accordianData, setAccordianData] = useState<any[]>([]);
    const [selectedFinish, setSelectedFinish] = useState<string>("Raw Concrete");

    const fetchProduct = async () => {
        const response = await productController.getProductById(slug ?? '');
        setProduct(response[0]);
        setAccordianData(response[0].attributes);
    }

    const [isStickyVisible, setIsStickyVisible] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [slug]);

    useEffect(() => {
        const handleScroll = () => {
            const hero = document.querySelector('.product-hero');
            if (hero) {
                const rect = hero.getBoundingClientRect();
                setIsStickyVisible(rect.bottom <= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                    <div className="prod-subtitle">{productController.getTitleSubscript(product)}</div>
                    <div className="prod-price flex items-center gap-2">
                        <span>Rs </span>
                        {product?.regular_price === product?.sale_price ? (
                            <span className="amount">{product?.sale_price}</span>
                        ) : (
                            <>
                                <span className="amount">{product?.sale_price}</span>
                                <del aria-hidden="true">
                                    <span className="woocommerce-Price-amount amount">{product?.regular_price}</span>
                                </del>
                            </>
                        )}
                    </div>
                    <div className="prod-tax">Incl. taxes · Free shipping above Rs 1,500</div>
                    <div className="availability">
                        <div className="avail-dot"></div>
                        <span className="avail-text">In stock — made to order</span>
                    </div>
                    <div className="variant-label">Finish</div>
                    <div className="variant-grid">
                        <button
                            className={`variant-btn ${selectedFinish === "Raw Concrete" ? "active" : ""}`}
                            onClick={() => setSelectedFinish("Raw Concrete")}
                        >
                            Raw Concrete
                        </button>
                        <button
                            className={`variant-btn ${selectedFinish === "Matte White" ? "active" : ""}`}
                            onClick={() => setSelectedFinish("Matte White")}
                        >
                            Matte White
                        </button>
                        <button
                            className={`variant-btn ${selectedFinish === "Charcoal" ? "active" : ""}`}
                            onClick={() => setSelectedFinish("Charcoal")}
                        >
                            Charcoal
                        </button>
                    </div>
                    <button
                        className="add-to-cart"
                        id="addBtn"
                        onClick={() => {
                            if (product) {
                                addToCart({
                                    productId: product.id.toString(),
                                    name: product.name,
                                    price: parseFloat(product.price || product.sale_price || "0"),
                                    image: product.images[0]?.src || "",
                                    finish: selectedFinish,
                                    slug: product.slug,
                                });
                            }
                        }}
                    >
                        Add to Cart
                    </button>
                    {/* <button className="wishlist-btn">Save to Wishlist</button> */}
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
            <YouMayAlsoLike id={product?.id} />
            <div className={`sticky-bar ${isStickyVisible ? 'visible' : ''}`} id="stickyBar">
                <div className="sticky-info">
                    <span className="sticky-name">{product?.name}</span>
                    <span className="sticky-price">Rs {product?.price}</span>
                </div>
                <button
                    className="sticky-btn"
                    onClick={() => {
                        if (product) {
                            addToCart({
                                productId: product.id.toString(),
                                name: product.name,
                                price: parseFloat(product.price || product.sale_price || "0"),
                                image: product.images[0]?.src || "",
                                finish: selectedFinish,
                                slug: product.slug,
                            });
                        }
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </>
    )
} 