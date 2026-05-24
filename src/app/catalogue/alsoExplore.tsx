import "@/app/globals.css"
import ProductController from "@/controllers/productController";
import { useEffect, useState } from "react";


export default function AlsoExplore({ currentCategory }: { currentCategory: number }) {
    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        ProductController.getCategories().then((data: any) => {
            data = data.filter((category: any) => (category.slug !== 'uncategorized' && category.id !== currentCategory));
            setCategories(data);
        });
    }, []);

    return (
        <div className="also-explore fu">
            <div className="ae-header">
                <h2 className="ae-title">Also explore</h2>
                <a href="#" className="ae-va">View all collections</a>
            </div>
            <div className="ae-grid">
                {
                    categories?.filter((category: any) => category.id !== currentCategory).map((category: any) => (
                        <div className="ae-card" key={category.name}>
                            <img src={category.image?.src} alt="" />
                            <div className="ae-overlay"></div>
                            <div className="ae-info">
                                <div className="ae-name">{category.name}</div>
                                <div className="ae-count">{category.count} pieces</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}