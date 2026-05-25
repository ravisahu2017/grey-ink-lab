import "@/app/globals.css"
import { useCategory } from "@/context/CategoryContext";

export default function AlsoExplore({ currentCategory }: { currentCategory: number }) {
    const { categories } = useCategory();
    const displayCategories = categories.filter((category: any) => category.id !== currentCategory);

    return (
        <div className="also-explore fu">
            <div className="ae-header">
                <h2 className="ae-title">Also explore</h2>
                <a href="#" className="ae-va">View all collections</a>
            </div>
            <div className="ae-grid">
                {
                    displayCategories.map((category: any) => (
                        <div className="ae-card" key={category.name} onClick={() => window.location.href = `/catalogue/${category.slug}`}>
                            <img src={category.image?.src} alt={category.name} />
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