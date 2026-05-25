export default function LifeGrid() {
    const data = [
        {
            image: `${process.env.NEXT_PUBLIC_WP_BACKEND_BASE}/wp-content/uploads/2026/05/lg1.jpeg`,
            cap: "In the room"
        },
        {
            image: `${process.env.NEXT_PUBLIC_WP_BACKEND_BASE}/wp-content/uploads/2026/05/lg2.jpeg`,
            cap: "At the core"
        },
        {
            image: `${process.env.NEXT_PUBLIC_WP_BACKEND_BASE}/wp-content/uploads/2026/05/lg3.jpeg`,
            cap: "The surface"
        }
    ];
    return (
        <div className="lifestyle-grid">
            {
                data.map((item: any, index: number) => (
                    <div key={index}>
                        <div className="lifestyle-img">
                            <img src={item.image} alt={item.cap} />
                        </div>
                        <div className="lifestyle-cap">{item.cap}</div>
                    </div>
                ))
            }
        </div>
    )
}