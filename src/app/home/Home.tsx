"use client"

import { useEffect, useState } from "react";
import productController from "@/controllers/productController";
import CategoryGrid from "./categoryGrid";
import Category from "./category";

export default function Home() {
    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        productController.getCategories().then((data: any) => {
            data = data.filter((category: any) => (category.slug !== 'uncategorized'));
            setCategories(data);
        });
    }, []);

    return (
        <>
            <section>

            </section>

            <CategoryGrid category={categories.find((category: any) => category.slug === 'collectibles')} />
            <Category category1={categories.find((category: any) => category.slug === 'tissue-holder')} category2={categories.find((category: any) => category.slug === 'lamp')} />
            <CategoryGrid category={categories.find((category: any) => category.slug === 'cosmos-collection')} />
        </>
    );
}