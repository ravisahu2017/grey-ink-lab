import "./ae.css"
import "@/app/globals.css"


export default function AlsoExplore({ currentCategory }: { currentCategory: number }) {

    const categories = [
        {
            id: 21,
            name: "Tissue Holders",
            count: 21,
            image: "http://localhost:8080/wp-content/uploads/2026/05/product_1.jpeg"
        },
        {
            id: 8,
            name: "Lamps",
            count: 8,
            image: "http://localhost:8080/wp-content/uploads/2026/05/lamp.jpeg"
        },
        {
            id: 7,
            name: "Collectibles",
            count: 12,
            image: "http://localhost:8080/wp-content/uploads/2026/05/lg3.jpeg"
        },
        {
            id: 23,
            name: "The Cosmos Collection",
            count: 10,
            image: "http://localhost:8080/wp-content/uploads/2026/05/cosmos.jpeg"
        }
    ]

    return (
        <div className="also-explore fu vis">
            <div className="ae-header">
                <h2 className="ae-title">Also explore</h2>
                <a href="#" className="ae-va">View all collections</a>
            </div>
            <div className="ae-grid">
                {
                    categories.filter((category: any) => category.id !== currentCategory).map((category: any) => (
                        <div className="ae-card" key={category.name}>
                            <img src={category.image} alt="" />
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