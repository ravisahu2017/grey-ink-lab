export default function CareSection() {
    const data = [
        {
            icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#AAA49C" stroke-width="0.8"><circle cx="14" cy="14" r="10" /><polyline points="14,8 14,14 18,16" /></svg>,
            title: "Made to Order",
            body: "Every Humpback is made after your order is placed. Allow 7–10 working days. This is not a delay — it is how we ensure each piece receives the full time it needs to be made properly."
        },
        {
            icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#AAA49C" stroke-width="0.8"><path d="M6 14 L11 19 L22 8" /><circle cx="14" cy="14" r="10" /></svg>,
            title: "Each One is Unique",
            body: "Surface texture, weight, and tone vary between pieces. This is not inconsistency — it is the material expressing itself. The piece you receive will not be identical to any photograph."
        },
        {
            icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#AAA49C" stroke-width="0.8"><path d="M4 22 Q14 4 24 22" /><path d="M8 22 Q14 10 20 22" /></svg>,
            title: "Ages With You",
            body: "Concrete develops character over time. Oils from your hands leave a natural patina. The piece you own in five years will look different from the one you received — and better for it."
        }
    ]
    return (
        <section className="care-section fu">
            {data.map((item: any) => (
                <div className="care-card">
                    <div className="care-icon-wrap">
                        {item.icon}
                    </div>
                    <div className="care-title">{item.title}</div>
                    <p className="care-body">{item.body}</p>
                </div>
            ))}
        </section>
    )
}