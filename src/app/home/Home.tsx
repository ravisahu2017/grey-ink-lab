"use client";

import { useCategory } from "@/context/CategoryContext";
import CategoryGrid from "./categoryGrid";
import Category from "./category";
import "./hero.css";

export default function Home() {
    const { categories, isLoading } = useCategory();

    const tissueHolderCategory = categories.find((category: any) => category.slug === 'tissue-holder');
    const heroImage = tissueHolderCategory?.image?.src || `${process.env.NEXT_PUBLIC_WP_BACKEND_BASE}/wp-content/uploads/2026/05/product_1.jpeg`;

    return (
        <>
            <section className="home-hero fu">
                <div className="hero-banner">
                    <img src={heroImage} alt="Grey Ink Lab Concrete Art" className="hero-image" />
                    <div className="hero-overlay">
                        <div className="hero-overlay-content">
                            <p className="hero-overlay-text">Objects don't have to<br />be ordinary.</p>
                            <button className="btn-hero-shop" onClick={() => {
                                document.querySelector('.home-category-grid')?.scrollIntoView({ behavior: 'smooth' });
                            }}>Shop Now</button>
                        </div>
                    </div>
                </div>
                <div className="hero-intro">
                    <h1 className="hero-title">Functional <em>art for</em> everyday living.</h1>
                    <p className="hero-desc">Greyinklab creates functional sculptures from concrete — shaped slowly, finished by hand, designed to hold presence in the everyday spaces you live in.</p>
                    <button className="btn-hero-story" onClick={() => window.location.href = '/story'}>Learn Our Story</button>
                </div>
            </section>

            <CategoryGrid category={categories.find((category: any) => category.slug === 'collectibles')} />
            <Category category1={categories.find((category: any) => category.slug === 'tissue-holder')} category2={categories.find((category: any) => category.slug === 'lamp')} />
            <CategoryGrid category={categories.find((category: any) => category.slug === 'cosmos-collection')} />
        </>
    );
}